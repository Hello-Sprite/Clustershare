import { createElement } from "react";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { flushSync } from "react-dom";
import Reveal from "./reveal";

const roots = new Map<HTMLElement, Root>();
function dispose() {
  roots.forEach((root) => root.unmount());
  roots.clear();
}
function mount(scope: HTMLElement) {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((section) => {
    const parent = section.parentElement;
    if (!parent || parent.classList.contains("reveal-frame")) return;
    const host = document.createElement("div");
    host.className = "reveal-host";
    const original = section.outerHTML;
    const props: Record<string, unknown> = Object.fromEntries(
      Array.from(section.attributes, (a) => [
        a.name === "class" ? "className" : a.name,
        a.value,
      ]),
    );
    props.dangerouslySetInnerHTML = { __html: section.innerHTML };
    section.replaceWith(host);
    try {
      const root = createRoot(host);
      roots.set(host, root);
      flushSync(() =>
        root.render(
          <Reveal index={Number(section.dataset.reveal) || 0}>
            {createElement(section.tagName.toLowerCase(), props)}
          </Reveal>,
        ),
      );
    } catch {
      roots.get(host)?.unmount();
      roots.delete(host);
      host.outerHTML = original;
    }
  });
}
declare global {
  interface Window {
    ClusterReveal?: { mount: typeof mount; dispose: typeof dispose };
  }
}
window.ClusterReveal = { mount, dispose };

window.dispatchEvent(new Event("clustershare:reveal-ready"));
