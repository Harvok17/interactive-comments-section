import { LitElement, html, css } from "lit";
import "./VoteButton.js";

export class CommentItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 120px;
      min-height: 120px;
      border-radius: 10px;
      background-color: var(--very-light-gray);
      padding: 20px;
    }

    .wrapper {
      height: 100%;
      width: 100%;
    }
  `;
  render() {
    return html`<div class="wrapper">
      <vote-button></vote-button>
    </div>`;
  }
}

customElements.define("comment-item", CommentItem);
