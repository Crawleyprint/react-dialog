export const Credits = () => {
  return (
    <>
      <h2>Credit where credit's due</h2>
      <p>
        While I was working on this library, I've used the works of others,
        mostly from these sources:
        <ol>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
              target="_blank"
            >
              MDN Web Docs on dialog element
            </a>
          </li>
          <li>
            <a
              href="https://css-tricks.com/dialog-components-roll-your-own/"
              target="_blank"
            >
              Rob Levin's excellent article on CSS Tricks
            </a>
          </li>
          <li>
            <a
              href="https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element"
              target="_blank"
            >
              HTML Spec for the dialog element
            </a>
          </li>
          <li>
            <a href="https://github.com/sjc5/use-html-dialog" target="_blank">
              This hook by Samuel J. Cook
            </a>
          </li>
        </ol>
      </p>
    </>
  );
};
