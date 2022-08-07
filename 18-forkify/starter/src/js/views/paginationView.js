import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    // this must listen to button clicks
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });

    // And also must read btn dataset.goto
  }
  // The generateMarkup name is standard because it will be called by View.render()
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //   Page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateButtonMarkup('next', curPage);
    }
    //   Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev', curPage);
    }
    //   Other page
    if (this._data.page < numPages) {
      return (
        this._generateButtonMarkup('next', curPage) +
        this._generateButtonMarkup('prev', curPage)
      );
    }
    //   Page 1 an there are NO other pages
    return;
  }

  _generateButtonMarkup(type, curPage) {
    return `
          <button data-goto="${
            type === 'next' ? curPage + 1 : curPage - 1
          }" class="btn--inline pagination__btn--${
      type === 'next' ? 'next' : 'prev'
    }">
            <span>Page ${type === 'next' ? curPage + 1 : curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>        
        `;
  }
}

export default new PaginationView();
