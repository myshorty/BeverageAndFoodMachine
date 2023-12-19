const { useState } = React;

// выбор напитков
function BeverageSelection({ onSelect }) {
  const beverages = ['Эспрессо', 'Латте', 'Капучино', 'Чай черный', 'Чай зеленый'];

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Выберите напиток:'),
      React.createElement('select', { onChange: (e) => onSelect(e.target.value, 'Напиток') },
        React.createElement('option', { value: '' }, 'Выберите напиток'),
        beverages.map(beverage =>
          React.createElement('option', { key: beverage, value: beverage }, beverage)
        )
      )
    )
  );
}

// выбор добавок к напиткам
function BeverageAdditions({ onSelect }) {
  const additions = ['Молоко', 'Сахар', 'Сироп'];

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Выберите добавку к напитку:'),
      React.createElement('select', { onChange: (e) => onSelect(e.target.value, 'Добавка к напитку') },
        React.createElement('option', { value: '' }, 'Без добавок'),
        additions.map(addition =>
          React.createElement('option', { key: addition, value: addition }, addition)
        )
      )
    )
  );
}

// выбор еды
function FoodSelection({ onSelect }) {
  const foods = ['Хлеб', 'Булочка'];

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Выберите еду:'),
      React.createElement('select', { onChange: (e) => onSelect(e.target.value, 'Еда') },
        React.createElement('option', { value: '' }, 'Выберите еду'),
        foods.map(food =>
          React.createElement('option', { key: food, value: food }, food)
        )
      )
    )
  );
}

// выбор добавок к еде
function FoodAdditions({ onSelect }) {
  const additions = ['Ветчина', 'Сыр', 'Джем'];

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Выберите добавку к еде:'),
      React.createElement('select', { onChange: (e) => onSelect(e.target.value, 'Добавка к еде') },
        React.createElement('option', { value: '' }, 'Без добавок'),
        additions.map(addition =>
          React.createElement('option', { key: addition, value: addition }, addition)
        )
      )
    )
  );
}

// выбор порций сахара
function SugarSelection({ onSelect }) {
  const sugarLevels = [0, 1, 2, 3, 4, 5];

  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Выберите количество порций сахара:'),
      React.createElement('select', { onChange: (e) => onSelect(Number(e.target.value), 'Сахар') },
        sugarLevels.map(level =>
          React.createElement('option', { key: level, value: level }, level)
        )
      )
    )
  );
}

// отображение итогового заказа
function OrderSummary({ order, totalCost }) {
  return (
    React.createElement('div', null,
      React.createElement('h2', null, 'Итоговый заказ:'),
      React.createElement('p', null,
        order.length > 0 ?
          order.map(item => React.createElement('span', { key: item.item }, `${item.item} (${item.category})`))
          : 'Заказ пуст'
      ),
      React.createElement('p', null, `Стоимость заказа: ${totalCost} руб.`)
    )
  );
}

// обновленный компонент для аппарата
function BeverageAndFoodMachine() {
  const [order, setOrder] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [sugarLevel, setSugarLevel] = useState(0);

  const addToOrder = (item, category) => {
    setOrder([...order, { item, category }]);
    const newTotalCost = calculateTotalCost([...order, { item, category }]);
    setTotalCost(newTotalCost);
  };

  const calculateTotalCost = (orderItems) => {
    const itemCosts = {
      'Эспрессо': 2,
      'Латте': 3,
      'Капучино': 4,
      'Чай черный': 2.5,
      'Чай зеленый': 3,
      'Молоко': 1,
      'Сахар': 0.5,
      'Сироп': 1.5,
      'Хлеб': 1,
      'Булочка': 1.5,
      'Ветчина': 2,
      'Сыр': 1.5,
      'Джем': 0.5,
    };

    return orderItems.reduce((total, item) => total + (itemCosts[item.item] || 0), 0);
  };

  const printOrder = () => {
    const orderString = order.map(item => `${item.item} (${item.category})`).join(' ');
    alert(`Заказ: ${orderString}\nКоличество сахара: ${sugarLevel} порции\nСтоимость: ${totalCost} руб.`);
  };

  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Аппарат по приготовлению напитков и еды'),

      React.createElement(BeverageSelection, { onSelect: addToOrder }),
      React.createElement(BeverageAdditions, { onSelect: addToOrder }),
      React.createElement(FoodSelection, { onSelect: addToOrder }),
      React.createElement(FoodAdditions, { onSelect: addToOrder }),
      React.createElement(SugarSelection, { onSelect: setSugarLevel }),
      React.createElement('button', { onClick: printOrder }, 'Выдать'),
      React.createElement(OrderSummary, { order, totalCost })
    )
  );
}

ReactDOM.render(
  React.createElement(BeverageAndFoodMachine),
  document.getElementById('app')
);