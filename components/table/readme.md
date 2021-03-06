# Table

The Table component is an enhanced version of the standard HTML `<table>`. A data-table consists of rows and columns of well-formatted data, presented with appropriate user interaction capabilities. This component uses a solid typed model, helping you to create formatted formated cells. These cells can be editable if you subscribe to `onChange` method who dispatch then new source with each change.

<!-- example -->
```jsx
import Table from 'react-toolbox/lib/table';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];

class TableTest extends React.Component {
  state = { selected: [], source: users };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  render () {
    return (
      <Table
        model={UserModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable={true}
        selected={this.state.selected}
        source={this.state.source}
      />
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`      | `''`            | Sets a custom class to style the Component.|
| `heading`       | `Bool`        | `true`          | If true, component will show a heading using model field names.|
| `model`         | `Object`      |                 | Object describing the data model that represents each object in the `source`.|
| `onChange`      | `Function`    |                 | Callback function that is fired when an item in a row changes. If set, rows are editable. |
| `onSelect`      | `Function`    |                 | Callback function invoked when the row selection changes.|
| `selectable`    | `Bool`       | `true`           | If true, the header and each row will display a checkbox to allow the user to select them.|
| `selected`    | `Array`       |                  | Array of indexes of the items in the source that should appear as selected.|
| `source`    | `Array`       |                  | Array of objects representing each item to show.|
