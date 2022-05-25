import { LitElement, html, css } from "lit";
import "./VoteButton.js";

export class CommentItem extends LitElement {
  static properties = {
    score: { type: Number },
    showReply: { type: Boolean, state: true },
  };

  static styles = css`
    /* :host {
      display: flex;
      height: 120px;
      min-height: 120px;
      border-radius: 10px;
      background-color: var(--very-light-gray);
      padding: 20px;
    }  */

    p {
      line-height: 1.5em;
    }

    .comment,
    .reply {
      min-height: 120px;
      display: flex;
      border-radius: 10px;
      background-color: var(--very-light-gray);
      padding: 20px;
    }

    .reply {
      margin-top: 10px;
      align-items: flex-start;
    }

    .reply textarea {
      flex: 1;
      margin-inline: 20px;
      height: 80px;
      border-radius: 10px;
      resize: none;
      padding: 20px;
      font-family: inherit;
    }

    .reply img {
      height: 40px;
      width: 40px;
    }

    .comment__details {
      flex: 1;
      padding-left: 20px;
    }

    .comment__header {
      display: flex;
      justify-content: space-between;
    }

    .avatar {
      display: flex;
      align-items: center;
    }

    .avatar img {
      height: 30px;
      width: 30px;
      margin-right: 20px;
    }

    .avatar__username {
      font-weight: bold;
      margin-right: 20px;
    }
  `;

  constructor() {
    super();
    this.score = 5;
    this.showReply = false;
  }

  updateScore(e) {
    console.log(e.target.score);
  }

  _toggleShowReply() {
    this.showReply = !this.showReply;
  }

  _renderReplyInput() {
    return html`
      <div class="reply">
        <img
          src="./images/avatars/image-juliusomo.png"
          alt="current user image"
        />
        <textarea></textarea>
        <button>Reply</button>
      </div>
    `;
  }

  render() {
    return html`<div class="comment">
        <vote-button
          @vote-changed=${this.updateScore}
          .score=${this.score}
        ></vote-button>
        <div class="comment__details">
          <div class="comment__header">
            <div class="avatar">
              <img
                src="./images/avatars/image-amyrobson.png"
                alt="user image"
              />
              <span class="avatar__username">amyrobson</span>
              <span class="avatar__comment-date">1 month ago</span>
            </div>
            <button @click=${this._toggleShowReply}>Reply</button>
          </div>
          <p>
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You've nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
      ${this.showReply ? this._renderReplyInput() : null}`;
  }
}

customElements.define("comment-item", CommentItem);
