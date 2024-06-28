import 'react-day-picker/dist/style.css';
import Dialog from 'homepage/app/pages/Index';
import Dropdown from 'homepage/app/pages/Dropdown';
import Embeds from 'homepage/app/pages/EmbedAnything';
import { Credits } from 'homepage/app/components/Credits';

export default function Index() {
  return (
    <div>
      <h2>Basic example</h2>
      <p>
        The following example is taken directly from the SPA example, with
        minimal changes.
      </p>
      <Dialog />
      <h2>Dropdowns</h2>
      <Dropdown />
      <h2>Embed other components</h2>
      <Embeds />
      <Credits />
    </div>
  );
}
