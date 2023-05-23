import "react"
import type * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    "--gutter"?: string | number;
    "--auto-grid-min-item-size"?: string;
  }
}