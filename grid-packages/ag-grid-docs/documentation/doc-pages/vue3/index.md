---
title: "Get Started with AG Grid"
frameworks: ["vue"]
version: 3
---
<style>
    .gatsby-resp-image-wrapper {
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-bottom: 1rem;
    }
    .gatsby-resp-image-image {
        box-shadow: none !important;
    }

    .code-tab pre {
        margin-top: 0;
    }

    .code-tab .nav-item {
        margin-bottom: 0 !important;
    }
</style>

AG Grid is the industry standard for Vue Enterprise Applications. Developers using AG Grid
are building applications that would not be possible if AG Grid did not exist.

<section class="code-tab mb-3">
<div class="card">
<div class="card-header">Quick Look Code Example</div>
<div class="card-body">
<ul class="nav nav-tabs">
<li class="nav-item">
<a  class="nav-link active" id="component-tab" data-toggle="tab" href="#component" role="tab" aria-controls="component" aria-selected="true">

App.vue

</a>
</li>
<li class="nav-item">
<a class="nav-link" id="template-tab" data-toggle="tab" href="#template" role="tab" aria-controls="template" aria-selected="false">

main.js

</a>
</li>
</ul>
<div class="tab-content">
<div class="tab-pane show active" id="component" role="tabpanel" aria-labelledby="component-tab">

```jsx
<template>
  <ag-grid-vue
    style="width: 500px; height: 200px"
    class="ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    return {
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" },
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 },
      ],
    };
  },
};
</script>
```

</div>
<div class="tab-pane" id="template" role="tabpanel" aria-labelledby="template-tab">
 
[[only-vue]]
```jsx
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

</div>
</div>
</div>
    <div class="text-right" style="margin-top: -1.5rem;">
        <a class="btn btn-dark mb-2 mr-3" href="https://codesandbox.io/s/ag-grid-vue-3-example-bvwik?file=/src/App.vue" target="_blank">Open in CodeSandbox</a>
    </div>
</div>
</section>

[[note]]
| We offer two versions of Vue support - one for Vue 2 and one for Vue 3. The only difference
| in use is how you import the dependency:
|
| | Version | Package Imports         | Module Imports          |
| | ------- | ----------------------- | ----------------------- |
| | Vue 2   | ag-grid-vue             | @ag-grid-community/vue  |
| | Vue 3   | ag-grid-vue3            | @ag-grid-community/vue3 |
|
| If you unsure what import type to use you should use the package import type
| (i.e. `ag-grid-vue`/ `ag-grid-vue3`).
|
| For more information on import types please refer to the documentation [here.](/modules/)
|
| This tutorial covers the use of Vue 3 with AG Grid - for the Vue 2 version of this tutorial please see the documentaiton [here.](/getting-started/)
|

## Add AG Grid to Your Project

For the purposes of this tutorial, we are going to scaffold an Vue app with
[Vue CLI](https://cli.vuejs.org/). Don't worry if your project has a different configuration.
Ag-Grid and its Vue wrapper are distributed as NPM packages, which should work with any common
Vue project module bundler setup. Let's follow the [Vue CLI instructions](https://cli.vuejs.org/) -
run the following in your terminal:

```bash
npm install -g @vue/cli
vue create my-project
```

When prompted choose "Manually select features":

```shell
Vue CLI v4.5.13
? Please pick a preset:
  Default ([Vue 2] babel, eslint)
  Default (Vue 3) ([Vue 3] babel, eslint)
❯ Manually select features
```

Next, select `Babel` and `CSS Pre-processors` (we've also deselected `Linter` here, but
this is optional):

```shell
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project:
  ◉ Choose Vue version
  ◉ Babel
  ◯ TypeScript
  ◯ Progressive Web App (PWA) Support
  ◯ Router
  ◯ Vuex
❯ ◉ CSS Pre-processors
  ◯ Linter / Formatter
  ◯ Unit Testing
  ◯ E2E Testing
```

Select version `3.x` when prompted:

```shell
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
  2.x
> 3.x 
```

Next select `Sass/SCSS (with dart-sass)` as the CSS Pre-processor:

```shell
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default):
> Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus
```

Now choose where to store the configuration data - we've opted for `dedicated config files`:

```shell
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files
  In package.json
```
Finally you can choose to save this configuration for all future projects - what you choose here will depend on your development setup & standards, so
for the purposes of this tutorial we'll select `No`:

```shell
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, CSS Pre-processors
? Choose a version of Vue.js that you want to start the project with 3.x
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (y/N) N
```

After a few seconds the newly created `my-project` will be ready - let's start our application:

```bash
cd my-project
npm run serve
```

If everything goes well, `npm run serve` has started the web server. You can open the
default app at <a href="http://localhost:8080" target="_blank">localhost:8080</a>.

Next let's add the AG Grid NPM packages. Run the following command in
`my-project`:

```bash
npm install ag-grid-vue3 ag-grid-community vue-class-component@next
```

After a few seconds of waiting, you should be good to go. Let's get to the actual coding!
As a first step, let's add the AG Grid styles - replace the `style` block in `src/App.vue` with the follow:

```scss
<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
```

The code above imports the grid "structure" stylesheet (`ag-grid.css`), and one of the
available grid themes: (`ag-theme-alpine.css`). AG Grid ships several different themes - pick one that
matches your project design.

[[note]]
| In a later section we documentation on how you can [Customise the Theme Look](#customise-the-theme-look-2)
| using SCSS, which is our recommended approach.

As this will be a simple example we can delete the `src/components` directory - our example
application will live in `src/App.vue`.

Let's add the component definition to our template. Edit `app/App.vue` and replace the scaffold code:

```html
<template>
    <ag-grid-vue style="width: 500px; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData">
    </ag-grid-vue>
</template>
```

This is the ag-grid component definition, with two property bindings - `rowData` and `columnDefs`.
The component also accepts the standard DOM `style` and `class`. We have set the class to `ag-theme-alpine`,
which defines the grid theme. As you may have already noticed, the CSS class matches the name of CSS file
we imported earlier.

Now let's replace the `script` section of`src/App.vue`:

```js
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    return {
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" },
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 },
      ],
    };
  },
};
```
  
The code above presents two essential configuration properties of the grid -
[the column definitions](/column-definitions/) (`columnDefs`) and the data (`rowData`).
In our case, the column definitions contain three columns; column entry specifies the header
label and the data field to be displayed in the body of the table.

Finally, note that we've imported the `ag-grid-vue` component - this is actual component that will
provide the AG Grid functionality.

If everything works as expected, you should see a simple grid like the one on the screenshot:

![AG Grid hello world](resources/step1.png)

## Enable Sorting And Filtering

So far, so good. But wouldn't it be nice to be able to sort the data to help us see which car
is the least/most expensive? Well, enabling sorting in AG Grid is actually quite simple -
all you need to do is set the `sortable` property to the column definitions.

```js
columnDefs: [
    { field: 'make', sortable: true },
    { field: 'model', sortable: true },
    { field: 'price', sortable: true }
],
```

After adding the `sortable` property you should be able to sort the grid by clicking on the column headers.
Clicking on a header toggles through ascending, descending and no-sort.

Our application doesn't have too many rows, so it's fairly easy to find data. But it's easy to
imagine how a real-world application may have hundreds (or even hundreds of thousands!) of rows,
with many columns. In a data set like this [filtering](/filtering/)
is your friend.

As with sorting, enabling filtering is as easy as setting the `filter` property:

```js
columnDefs: [
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
],
```

With this property set, the grid will display a small column menu icon when you hover the header.
Pressing it will display a popup with a filtering UI which lets you choose the kind of filter and
the text that you want to filter by.

![AG Grid sorting and filtering](resources/step2.png)

## Fetch Remote Data

Displaying hard-coded data in JavaScript is not going to get us very far. In the real world, most of
the time, we are dealing with data that resides on a remote server. Thanks to Vue, implementing this
is actually quite simple. Notice that the actual data fetching is performed outside of the grid
component - We are using the HTML5 `fetch` API.

Now, let's remove the hard-coded data and fetch it from a remote server. Edit the `src/App.vue` and
add the following fetch statement:

```js
// at the top of <script>
import {reactive, onMounted} from "vue";

// in the setup method
setup() {
    let rowData = reactive([]);

    onMounted(() => {
        fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
          .then(result => result.json())
          .then(remoteRowData => rowData.value = remoteRowData);
    })

    return {
        columnDefs: [
            { field: 'make', sortable: true, filter: true },
            { field: 'model', sortable: true, filter: true },
            { field: 'price', sortable: true, filter: true }
      ],
      rowData
    };
},
```

We also need to update the template to access the `rowData` by `value` now, as we're using a `reactive` property:

```html
<template>
    <ag-grid-vue style="width: 500px; height: 500px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData.value">
    </ag-grid-vue>
</template>
```
The remote data is the same as the one we initially had, so you should not notice any actual
changes to the grid. However, you will see an additional HTTP request performed if you open
your developer tools.

## Enable Selection

Being a programmer is a hectic job - just when we thought that we are done with our assignment, the
manager shows up with a fresh set of requirements! It turned out that we need to allow the user to
select certain rows from the grid and to mark them as flagged in the system. We will leave the flag
toggle state and persistence to the backend team. On our side, we should enable the selection and,
afterwards, to obtain the selected records and pass them with an API call to a remote service endpoint.

Fortunately the above task is quite simple with AG Grid. As you may have already guessed, it is
just a matter of adding and changing couple of properties.

```diff
<template>
  <ag-grid-vue style="width: 500px; height: 500px;"
               class="ag-theme-alpine"
               :columnDefs="columnDefs"
               :rowData="rowData.value"
+              rowSelection="multiple">
  </ag-grid-vue>
</template>

<script>
import {reactive, onMounted} from "vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    let rowData = reactive([]);

    onMounted(() => {
      fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
              .then(result => result.json())
              .then(remoteRowData => rowData.value = remoteRowData);
    })

    return {
      columnDefs: [
+       { field: 'make', sortable: true, filter: true, checkboxSelection: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true }
      ],
      rowData
    };
  },
};
</script>

<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
```

We've enabled [multiple row selection](/row-selection/#example-multiple-row-selection) by adding `rowSelection="multiple"`, and we've
also added a checkbox to the `make` column with `checkboxSelection: true`.

![Vue AG Grid Selection](resources/vue-grid-1.png)
 
Great! Now the first column contains a checkbox that, when clicked, selects the row. The only thing
we have to add is a button that gets the selected data and sends it to the server. To do this, we are
going to use the [AG Grid API](/grid-api/) - we will store a reference to both the grid and
column API's in the `gridReady` event

To test this we'll add a button that gets the selected data and sends it to the server.
Let's go ahead and make these changes:

```diff
<template>
+ <button @click="getSelectedRows()">Get Selected Rows</button>

  <ag-grid-vue style="width: 500px; height: 500px;"
               class="ag-theme-alpine"
               :columnDefs="columnDefs"
               :rowData="rowData.value"
               rowSelection="multiple"
               @grid-ready="onGridReady">
  </ag-grid-vue>
</template>

<script>
+import {reactive, ref, onMounted} from "vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    let rowData = reactive([]);
+   let gridApi = ref(null);
+   let columnApi = ref(null);

    onMounted(() => {
      fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
              .then(result => result.json())
              .then(remoteRowData => rowData.value = remoteRowData);
    })

+   const onGridReady = params => {
+     gridApi = params.api;
+     columnApi = params.columnApi;
+   };

+   const getSelectedRows = () => {
+     const selectedNodes = gridApi.getSelectedNodes();
+     const selectedData = selectedNodes.map( node => node.data );
+     const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
+     alert(`Selected nodes: ${selectedDataStringPresentation}`);
+   };

    return {
      columnDefs: [
        { field: 'make', sortable: true, filter: true, checkboxSelection: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true }
      ],
      rowData,
+     onGridReady,
+     getSelectedRows
    };
  },
};
</script>

<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
```

Well, we cheated a bit. Calling `alert` is not exactly a call to our backend. Hopefully
you will forgive us this shortcut for the sake of keeping the article short and simple.
Of course, you can substitute that bit with a real-world application logic after you are
done with the tutorial.

## Grouping

[[note]]
| Grouping is a feature exclusive to AG Grid Enterprise. You are free to trial AG Grid Enterprise
| to see what you think. You only need to get in touch if you want to start using AG Grid Enterprise
| in a project intended for production.

In addition to filtering and sorting, [grouping](/grouping/) is another effective way for the user
to make sense out of large amounts of data.

Our current data set is pretty small so let's switch to a larger one:

```diff
- fetch('https://www.ag-grid.com/example-assets/small-row-data.json')
+ fetch('https://www.ag-grid.com/example-assets/row-data.json')
```

Let's enable the enterprise features of ag-grid. Install the additional package:

```bash
npm install --save ag-grid-enterprise
```

Then, add the import to `src/main.js`:

```diff
  import { createApp } from 'vue'
  import App from './App.vue'

+ import 'ag-grid-enterprise';

  createApp(App).mount('#app')
```

After restarting the application you should see a message in the console that tells you there is no
enterprise license key. You can ignore the message as we are trialing. In addition to that,
the grid got a few UI improvements - a custom context menu and fancier column menu popup -
feel free to look around:

![AG Grid final](resources/step3.png)

Now, let's enable grouping! Add an `autoGroupColumnDef` property, bind to it, and update
the `columnDefs` with a `rowGroup`:

```diff
<template>
  <button @click="getSelectedRows()">Get Selected Rows</button>

  <ag-grid-vue style="width: 500px; height: 500px;"
               class="ag-theme-alpine"
               :columnDefs="columnDefs"
               :rowData="rowData.value"
               rowSelection="multiple"
+              :autoGroupColumnDef="autoGroupColumnDef"
               @grid-ready="onGridReady">
  </ag-grid-vue>
</template>

<script>
import {reactive, ref, onMounted} from "vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  name: "App",
  components: {
    AgGridVue,
  },
  setup() {
    let rowData = reactive([]);
    let gridApi = ref(null);
    let columnApi = ref(null);

    onMounted(() => {
+     fetch('https://www.ag-grid.com/example-assets/row-data.json')
              .then(result => result.json())
              .then(remoteRowData => rowData.value = remoteRowData);
    })

    const onGridReady = params => {
      gridApi = params.api;
      columnApi = params.columnApi;
    };

    const getSelectedRows = () => {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map( node => node.data );
      const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ');
      alert(`Selected nodes: ${selectedDataStringPresentation}`);
    };

    return {
      columnDefs: [
+       { field: 'make', sortable: true, filter: true, checkboxSelection: true, rowGroup: true  },
        { field: 'model', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true }
      ],
      rowData,
+     autoGroupColumnDef: {
+       headerName: 'Model',
+       field: 'model',
+       cellRenderer: 'agGroupCellRenderer',
+       cellRendererParams: {
+         checkbox: true
+       }
+     },
      onGridReady,
      getSelectedRows
    };
  },
};
</script>

<style lang="scss">
  @import "~ag-grid-community/dist/styles/ag-grid.css";
  @import "~ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>

```

There we go! The grid now groups the data by `make`, while listing the `model` field value when expanded.
Notice that grouping works with checkboxes as well - the `groupSelectsChildren` property adds a group-level
checkbox that selects/deselects all items in the group.

Note that we also removed `checkboxSelection: true` from the `make` column definition as the `autoGroupColumnDef` definition allows for checkbox selection
at both the group and leaf level.

[[note]]
| Don't worry if this step feels a bit overwhelming - the  grouping feature is very powerful and
| supports complex interaction scenarios which you might not need initially. The grouping documentation
| section contains plenty of real-world runnable examples that can get you started for your particular case.

## Customise the Theme Look

The last thing which we are going to do is to change the grid look and feel by modifying some
of the theme's Sass variables.

By default, AG Grid ships a set of
[pre-built theme stylesheets](/themes/). If we want to tweak the colors and the fonts of
theme, we should add a Sass preprocessor to our project, override the theme variable values,
and refer the ag-grid Sass files instead of the pre-built stylesheets so that the variable
overrides are applied.

The `vue cli` did a lot of for us including providing support for Sass. Let's switch to using
the provided AG Grid SCSS files - replace the `style` block in `src/App.vue` with:

```scss
<style lang="scss">
  @import "~ag-grid-community/src/styles/ag-grid.scss";
  @import "~ag-grid-community/src/styles/ag-theme-alpine/sass/ag-theme-alpine-mixin.scss";

  .ag-theme-alpine {
    @include ag-theme-alpine((
      odd-row-background-color: #ACE
    ));
  }
</style>
```

If everything is configured correctly, the second row of the grid will be blue. Congratulations!
You now know now bend the grid look to your will - there are a few dozens more Sass variables that
let you control the font family and size, border color, header background color and even the amount
of spacing in the cells and columns. The full [Sass variable list](/themes-customising/#full-list-of-theme-parameters)
is available in the themes documentation section.

## Summary

With this tutorial, we managed to accomplish a lot. Starting from the humble beginnings of a
three row / column setup, we now have a grid that supports sorting, filtering, binding to remote
data, selection and even grouping! While doing so, we learned how to configure the grid, how to
access its API object, and how to change the styling of the component.

