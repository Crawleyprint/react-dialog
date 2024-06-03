import "./App.css";
import Dialog from "./components/Dialog";

function App() {
  return (
    <div className="container">
      <main className="content">
        <h1>HTML native dialogs</h1>
        <p>
          Dialogs are nice. They are a part of the HTML standard, easy to create
          and accessible. You can use keyboard to navigate them with very little
          effort and they, for the most part, work without javascript.
        </p>
        <div className="dialog-value">
          This text will change when you update the dialog.
        </div>
        <Dialog
          onClose={() => console.log("close dialog")}
          targetLabel="Click to open dialog"
        >
          <header>
            <h1>Dialog title</h1>
          </header>
          <form method="dialog">
            <main>
              <label htmlFor="text">
                Type in the text below and it will be shown when you close the
                dialog
                <input type="text" />
              </label>
            </main>
          </form>
        </Dialog>
        <Dialog targetLabel="Open dropdown" type="flyout">
          Dropdown content
        </Dialog>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          repudiandae saepe fuga laborum sunt facilis quos eius aliquid atque,
          placeat quasi odit modi voluptate, molestias minima soluta quis, id
          dignissimos! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus repudiandae saepe fuga laborum sunt facilis quos eius aliquid
          atque, placeat quasi odit modi voluptate, molestias minima soluta
          quis, id dignissimos! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Ducimus repudiandae saepe fuga laborum sunt facilis
          quos eius aliquid atque, placeat quasi odit modi voluptate, molestias
          minima soluta quis, id dignissimos! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ducimus repudiandae saepe fuga laborum
          sunt facilis quos eius aliquid atque, placeat quasi odit modi
          voluptate, molestias minima soluta quis, id dignissimos! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Ducimus repudiandae saepe
          fuga laborum sunt facilis quos eius aliquid atque, placeat quasi odit
          modi voluptate, molestias minima soluta quis, id dignissimos!
        </div>
      </main>
    </div>
  );
}

export default App;
