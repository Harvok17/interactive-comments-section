import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers";
import { updateCommentScore, updateReplyScore } from "../redux/actions.js";
import { store } from "../redux/store.js";
import "./VoteButton.js";

export class CommentItem extends connect(store)(LitElement) {
  static properties = {
    commentData: { type: Object },
    score: { type: Number },
    _showReply: { type: Boolean, state: true },
    _showEdit: { type: Boolean, state: true },
    currentUser: { type: Object },
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

    .comment__reply-to {
      font-weight: bold;
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

    .edit-input {
      display: flex;
      flex-direction: column;
    }

    .edit-input textarea {
      flex: 1;
      margin-block: 20px;
      height: 80px;
      border-radius: 10px;
      resize: none;
      padding: 20px;
      font-family: inherit;
    }

    .edit-input button {
      align-self: flex-end;
    }
  `;

  constructor() {
    super();
    this._showReply = false;
    this._showEdit = false;
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
    this._showReply = !this._showReply;
  }

  _toggleShowEdit() {
    this._showEdit = !this._showEdit;
  }

  _renderReplyInput() {
    return html`
      <div class="reply">
        <img
          src="${this.currentUser.image.png}"
          alt="${this.currentUser.username} image"
        />
        <textarea></textarea>
        <button>Reply</button>
      </div>
    `;
  }

  render() {
    const { content, user, score, createdAt, replyingTo } = this.commentData;
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
            ${user.username === this.currentUser.username
              ? html` <div>
                  <button @click=${() => {}}>Delete</button>
                  <button @click=${this._toggleShowEdit}>Edit</button>
                </div>`
              : html`<button @click=${this._toggleShowReply}>Reply</button>`}
          </div>

          ${this.replyContext && this._showEdit
            ? html` <div class="edit-input">
                <textarea></textarea>
                <button>Update</button>
              </div>`
            : this.replyContext
            ? html` <p>
                <span class="comment__reply-to">@${replyingTo}</span> ${content}
              </p>`
            : html`<p>${content}</p>`}
        </div>
      </div>
      ${this._showReply ? this._renderReplyInput() : null}`;
  }
}

customElements.define("comment-item", CommentItem);
