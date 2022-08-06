import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView._clear();
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    // Rendering html
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView._clear();
    // 1) get query string from view
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2) get results from model
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage(2));

    // 3) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// publisher-subscriber logic from views
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
