import React from "react";
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import uuidv1 from 'uuid/v1';

const useStyles = makeStyles(theme => ({
    cart: {
        position: 'absolute',
        top: '90px',
        right: '18px',
        width: '540px',
        minHeight: '100px',
        maxHeight: '80%',
        background: '#cacaca',
        webkitBoxShadow: '5px 4px 10px 3px rgba(0, 0, 0, 0.77)',
        boxShadow: '5px 4px 10px 3px rgba(0, 0, 0, 0.77)',
        overflow: 'auto',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 0px',
    },
    staticItem: {
        backgroundColor: 'silver',
    },
    name: {
        width: '300px',
        paddingTop: 4,
        fontWeight: 'bold',
    },
    title: {
        backgroundColor: '#3fb36b',
        padding: 8,
        fontWeight: 'bold',
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#3fb36b',
        fontWeight: 'bold',
    },
    countButton: {
        border: 'solid 1px black',
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 4,
        width: 10,
        fontWeight: 'bold',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: 'gray',
        }
    },
    countBlock: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
        fontWeight: 'bold',

    },
    price: {
        width: 90,
        paddingTop: 4,
        fontWeight: 'bold',
        paddingLeft: 7,
    },
    sumContainer: {
        position: 'relative',
        padding: 8,
        backgroundColor: '#3fb36b',
        height: 30,
    },
    sum: {
        position: 'absolute',
        right: 38,
        top: 0,
        bottom: 0,
        lineHeight: '30px',
        fontWeight: 'bold',
    },
    field: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        display: 'inline-block',
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
    },
    deleteButton: {
        color: 'red',
        border: 'solid 1px black',
        borderRadius: 10,
        background: 'White',
        cursor: 'pointer',
        padding: 4,
        "&:hover": {
            background: 'gray',
        }

    },
    field: {
        fontWeight: 'bold',
        display: 'inline-block',
        flexDirection: 'row',
        padding: '8px 15px 0px 4px',
    },
    commentContainer: {
        fontWeight: 'bold',

    }
}))

function CartItem(props) {
    const { item, updateItem, deleteItem } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.item, {
            [classes.staticItem]: item.isStatic,
        })}>
            <div className={classes.name}>{item.name}</div>
            <div className={classes.countBlock}>
                <span
                    className={classes.countButton}
                    onClick={() => {
                        item.count = Math.max(item.count - 1, 0);
                        updateItem(item);
                    }}
                >-</span>
                <span style={{ flex: '1 1 auto', paddingTop: '4px' }}>{item.count}</span>
                <span
                    className={classes.countButton}
                    onClick={() => {
                        item.count = item.count + 1;
                        updateItem(item);
                    }}
                >+</span>
            </div>
            <div className={classes.price}>
                {item.price}
            </div>
            <div style={{ width: 40 }}>
                <span
                    className={classes.deleteButton}
                    onClick={() => deleteItem(item)}
                >
                    X
                </span>
            </div>
        </div>
    )
}

async function getToken() {
    const response = await fetch("https://loyalty.syrve.live/api/0/auth/access_token?user_id=Bambooksushi&user_secret=Bambooksushi2022", {
        method: 'GET',
    });

    const token = await response.text();
    return token.substring(1, token.length - 1);
}

function getDate() {
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
    return dt.toISOString().substring(0, 19).replace("T", " ");
}

async function sendOrder(order) {
    const token = await getToken();
    console.log("token", token);
    const url = `https://loyalty.syrve.live/api/0/orders/add?access_token=${token}&request_timeout=0:1:00`;

    const data = {
        organization: "0ba20000-29b3-b8cb-d586-08da29156598",
        customer: {
            id: uuidv1(),
            name: order.name,
            phone: order.phone,
        },
        order: {
            id: uuidv1(),
            phone: order.phone,

            address: {
                street: order.address,
                home: "1",
                isSelfService: true,
            },
            date: getDate(),
            personsCount: 1,
            items: order.cart.map(item => ({
                id: item.id,
                name: item.name,
                amount: item.count,

            })),
            comment: order.comment,
        }
    }

    console.log("data", data);

    return await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
}

export default function Cart(props) {
    const { cart, setCart } = props;
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [comment, setComment] = React.useState("");

    const classes = useStyles();

    const updateItem = React.useCallback(item => {
        const newCart = cart.map(cartItem => {
            if (cartItem.name === item.name) {
                return { ...item }
            }
            return cartItem;
        })

        setCart(newCart);
    }, [cart])

    const deleteItem = React.useCallback(item => {
        setCart(cart.filter(cartItem => cartItem !== item));
    }, [cart])

    const order = async () => {
        const orderObject = {
            name,
            phone,
            address,
            comment,
            cart
        }

        const response = await sendOrder(orderObject);

        if (response.status === 200) {
            setCart([]);
        } else {
            alert(response.statusText);
        }
    }

    const sum = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.count, 0);

    return (
        <div className={classes.cart}>
            <div className={classes.title}>Корзина</div>
            <div className={classes.columns}>
                <div style={{ width: 300 }}>Товар</div>
                <div style={{ width: 100 }}>Кількість</div>
                <div style={{ width: 100 }}>Ціна</div>
            </div>
            <div>
                {cart.map(item => <CartItem item={item} updateItem={updateItem} deleteItem={deleteItem} />)}
            </div>
            <div className={classes.sumContainer}>
                <div className={classes.sum}>
                    <span style={{ marginRight: 8 }}>Сума:</span>
                    {sum}
                </div>
            </div>
            <div>
                <div className={classes.field}>
                    <span>Ім'я:</span>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={classes.field}>
                    <span>Телефон:</span>
                    <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
            </div>
            <div>
                <div className={classes.field} style={{ display: 'flex', flexDirection: 'row', padding: '8px 15px 0px 4px', fontWeight: 'bold' }}>
                    <span>Вулиця:</span>
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        style={{ flex: '1 1 auto' }}
                    />
                    <span>Будинок:</span>
                    <input
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        style={{ flex: '1 1 auto' }}
                    />
                </div>
            </div>
            <div className={classes.commentContainer} style={{ paddingTop: 10, }}>
                <div>Коментар:</div>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    style={{ minHeight: 100, width: '99%' }}
                />
            </div>

            {/* class Demo2 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  formSubmit(event) {
    event.preventDefault();
    console.log(this.state.selectedOption)
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Male"
              checked={this.state.selectedOption === "Male"}
              onChange={this.onValueChange}
            />
            Male
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Female"
              checked={this.state.selectedOption === "Female"}
              onChange={this.onValueChange}
            />
            Female
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Other"
              checked={this.state.selectedOption === "Other"}
              onChange={this.onValueChange}
            />
            Other
          </label>
        </div>
        <div>
          Selected option is : {this.state.selectedOption}
        </div>
        <button className="btn btn-default" type="submit">
          Submit
        </button>
      </form>
    );
  }
} */}


            <div className={classes.typePayment} style={{ display: 'block', flexDirection: 'row', padding: '8px 15px 0px 4px', fontWeight: 'bold', cursor: 'pointer' }}>
                <div>Тип оплати:</div>
                <div className="radio-button">
                    <input type="radio" value="Card" name="Pay" /> Оплата на сайті
                </div>
                <div className="radio-button">
                    <input type="radio" value="Therminal" name="Pay" /> Термінал
                </div>
                <div className="radio-button">
                    <input type="radio" value="Cash" name="Pay" /> Готівка(Самовивіз)
                </div>
            </div>
            <div className="issue-button">
                <button className={classes.issue} style={{ fontSize: 30, background: '#2ad76f', cursor: 'pointer' }}
                    onClick={order}
                >
                    Оформити замовлення
                </button>
            </div>
        </div>
    )
}