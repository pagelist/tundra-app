/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import {
  test,
  expect,
  vi,
  beforeAll,
  beforeEach,
  describe,
  afterEach,
} from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import { useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";

beforeAll(() => {
  // temporary workaround for react-testing-library
  const g = globalThis as any;
  const _jest = g.jest as any;

  g.jest = {
    ...g.jest,
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
  };

  return () => void (g.jest = _jest);
});

test("Renders default img", async () => {
  const p = render(<Pet />);
  const thumb = (await p.findByTestId("thumb")) as HTMLImageElement;
  expect(thumb.src).toContain("none.jpg");
  p.unmount();
});

test("Clicking img makes it being main", async () => {
  const images = ["dog1.jpg", "dog2.jpg", "dog3.jpg"];
  const firstImg = images.at(0);

  let c = render(<Carousel images={images} />);
  let buttons = await c.findAllByRole("button");

  let hero = (await c.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(firstImg);

  for (let i = 0; i < buttons.length; i++) {
    const pet = buttons.at(i);
    const newImg = pet?.dataset.src;
    if (pet) {
      await pet.click();
      expect(hero.src).toContain(newImg);
    }
  }
});

describe("Timers & hooks", () => {
  beforeEach(() => {
    // vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test("mocks timers", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useBreed());

    await act(() => vi.runAllTimers());
    await waitFor(() => expect(result.current).toBe("done"));
  });

  test("render hook", async () => {
    // https://pets-v2.dev-apis.com/breeds?animal=dog
    const { result } = renderHook(() => useBreed());
    expect(result.current).toBe("loading");
  });
});

/// IMPLEMENTATION
type State = {
  activePet: string;
};
type Action = {
  type: "CLICKED_PET";
  newActive: string;
};

function reducer(state: State, action: Action): State {
  if (action.type === "CLICKED_PET") {
    return { activePet: action.newActive };
  }
  return state;
}

function Carousel({ images }: { images: string[] }) {
  const firstImg = images.at(0) ?? "none.jpg";
  const [state, dispatch] = useReducer(reducer, { activePet: firstImg });

  return (
    <section>
      <figure aria-details="currently selected pet">
        <img data-testid="hero" src={state.activePet} />
      </figure>
      <ul>
        {images.map((img) => {
          return (
            <li key={img}>
              <button
                data-src={img}
                onClick={(event) => {
                  const newActive = event.currentTarget.dataset.src;
                  if (newActive) {
                    dispatch({
                      type: "CLICKED_PET",
                      newActive,
                    });
                  }
                }}
              >
                <Pet key={img} img={img} />;
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Pet({ img }: { img?: string }) {
  const imgSrc = img ?? "none.jpg";
  return <img data-testid="thumb" src={imgSrc} />;
}

function useBreed() {
  const [state, setState] = useState<"loading" | "done">("loading");

  useEffect(() => {
    setTimeout(() => setState("done"), 5000);
  }, []);

  return state;
}
