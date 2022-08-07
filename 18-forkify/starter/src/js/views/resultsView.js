import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.search-results');
  _errorMessage = 'We could not find your recipe. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    return `
            <li class="preview">
              <a class="preview__link" href="#${result.id}">
                <figure class="preview__fig">
                  <img src="${result.imageUrl}" alt="${result.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.publisher}</p>
                </div>
              </a>
            </li>
        `;
  }
}
export default new ResultsView();
