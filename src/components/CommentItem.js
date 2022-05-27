import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import { updateCommentScore, updateReplyScore } from "../redux/actions.js";
import { store } from "../redux/store.js";
import "./VoteButton.js";

export class CommentItem extends connect(store)(LitElement) {
  static properties = {
    commentData: { type: Object },
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

    :host {
      display: block;
      margin-bottom: 20px;
    }

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
    this.showReply = false;
    this.commentData = {};
    this.replyContext = false;
    this.parentCommentId = null;
  }

  _updateScore(e) {
    const commentId = this.commentData.id;
    const score = e.target.score;

    if (this.replyContext && this.parentCommentId) {
      store.dispatch(updateReplyScore(this.parentCommentId, commentId, score));
    } else {
      store.dispatch(updateCommentScore(commentId, score));
    }
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
    const { content, user, score, createdAt } = this.commentData;
    return html`<div class="comment">
        <vote-button
          @vote-changed=${this._updateScore}
          .score="${score}"
        ></vote-button>
        <div class="comment__details">
          <div class="comment__header">
            <div class="avatar">
              <img src="${user.image.png}" alt="user image" />
              <span class="avatar__username">${user.username}</span>
              <span class="avatar__comment-date">${createdAt}</span>
            </div>
            <button @click=${this._toggleShowReply}>Reply</button>
          </div>
          <p>${content}</p>
        </div>
      </div>
      ${this.showReply ? this._renderReplyInput() : null}`;
  }
}

customElements.define("comment-item", CommentItem);
