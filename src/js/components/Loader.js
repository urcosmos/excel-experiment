import { J } from '../core/Dom';

export function Loader() {
  return J.create('div', 'loader').html(`
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `);
}
