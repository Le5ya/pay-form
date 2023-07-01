const inputNum= document.querySelector('.form__input_num');
const cardMask = new Inputmask('9999 9999 9999 9999');
cardMask.mask(inputNum);

const validityTerm = document.querySelector('.form__input_date');
const termMask = new Inputmask('99 / 99', {placeholder: "MM / YY"});
termMask.mask(validityTerm);

const inputCvv = document.querySelector('.form__input_cvv')
const cvvMask = new Inputmask('999');
cvvMask.mask(inputCvv);


const justValidate = new JustValidate('.payment__form');


justValidate
  .addField('.form__input_name', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваше имя'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Слишком короткое имя'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Слишком длинное имя'
      }
  ])
  .addField('.form__input_num', [
    {
      rule: 'required',
      errorMessage: 'Укажите номер карты'
    },
//     {
//       rule: 'minLength',
//         value: 16,
//       validator(value) {
//         console.log(value);
//         return false
//             const card = inputNum.cardMask.unmaskedvalue();
//             return (Number(card) && card.length === 16);
            
//             },
//             errorMessage: 'Номер не корректный'
//     }
   ])
  .addField('.form__input_date', [{
    rule: 'required',
    errorMessage: 'Укажите срок действия карты'
  }])
  .addField('.form__input_cvv', [{
    rule: 'required',
    errorMessage: 'Введите CVV'
  },
  // { 
  //   validator(value) {
      
  //     const cvv = inputCvv.cvvMask.unmaskedvalue();
  //     return (Number(cvv) && cvv.length === 3);
      
  //   },
  //   errorMessage: 'CVV не корректный'
  // }
])
  // .onSucces(event => {
  //   const target = event.target;
  //   axios.post('https://jsonplaceholder.typicode.com/posts', {
  //     name: target.name.value,
  //     tel: inputTel.inputmask.unmaskedvalue(),
  //   })
  //   .then(response => {
  //     target.reset();
  //     modalOrderTitle.textContent = `Спасибо, ваша заявkа принята, номер заявки ${responce.data.id}!`
  //   }) 
  //   .catch(err => {
  //     modalOrderTitle.textContent = `Что-то пошло не так, попробуйте снова!`
  //   })
  // })


const form = document.querySelector('.payment__form');

form.submit(function (event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos',
    type: 'POST',
    data: $(this).serialize(),
    success(data) {
      modalOrderTitle.text('Спасибо, ваша карта принята, номер заявки ' + data.id)
      $('.modal-order__form').slideUp(300);
    },
    error() {
      modalOrderTitle.text('Что-то пошло не так, попробуйте позже')
    }
    
  })
})
  form.reset()