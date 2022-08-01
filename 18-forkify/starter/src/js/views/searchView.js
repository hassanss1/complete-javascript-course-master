class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', handler);
  }
}
export default new SearchView();
