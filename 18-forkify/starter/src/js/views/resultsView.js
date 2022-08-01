import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  //   _generateMarkup() {
  //     return `
  //           <li class="preview">
  //             <a class="preview__link preview__link--active" href="#23456">
  //               <figure class="preview__fig">
  //                 <img src="${this._data.imageUrl}" alt="Test" />
  //               </figure>
  //               <div class="preview__data">
  //                 <h4 class="preview__title">${this._data.title}</h4>
  //                 <p class="preview__publisher">${this._data.publisher}</p>
  //                 <div class="preview__user-generated">
  //                   <svg>
  //                     <use href="${icons}#icon-user"></use>
  //                   </svg>
  //                 </div>
  //               </div>
  //             </a>
  //           </li>
  //       `;
  //   }
  //   render() {}
}
export default new ResultsView();
