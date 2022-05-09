import { LitElement, html, css } from "lit";
import "./VoteButton.js";

export class CommentItem extends LitElement {
  static properties = {
    score: { type: Number },
    vote: { type: String, reflect: true },
  };

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

  constructor() {
    super();
    this.score = 5;
  }

  updateScore(e) {
    this.vote = e.detail.value;
  }

  willUpdate(changedProps) {
    if (changedProps.has("vote")) {
      const newValue = this.vote;
      const oldValue = changedProps.get("vote");

      if (newValue === "up") {
        if (oldValue === "down") {
          this.score += 2;
        } else {
          this.score += 1;
        }
      } else if (newValue === "down") {
        if (oldValue === "up") {
          this.score -= 2;
        } else {
          this.score -= 1;
        }
      }
    }
  }

  render() {
    return html`<div class="wrapper">
      <vote-button
        @onVote=${this.updateScore}
        .score=${this.score}
      ></vote-button>
    </div>`;
  }
}

customElements.define("comment-item", CommentItem);
