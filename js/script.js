const inputNum = document.querySelector('.form__input_num');
const cardMask = new Inputmask("9999 9999 9999 9999");
cardMask.mask(inputNum);


const validityTerm = document.querySelector('.form__input_date');
const termMask = new Inputmask('99 / 99', {placeholder: "MM / YY"});
termMask.mask(validityTerm);

const inputCvv = document.querySelector('.form__input_cvv')
const cvvMask = new Inputmask('999');
cvvMask.mask(inputCvv);

const inputName = document.querySelector('.form__input_name')


const cardNumber = document.querySelector('.card__number');
const ownerName = document.querySelector('.owner__name');
const ownerTime = document.querySelector('.owner__time');

const checkTitle = document.querySelector('.payment__check-title')

inputNum.oninput = function() {
  cardNumber.textContent = this.value;
} 
inputName.oninput = function() {
  ownerName.textContent = this.value;
} 
validityTerm.oninput = function() {
  ownerTime.textContent = this.value;
} 

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
    {

      validator(value) {
            const card = cardMask.unmaskedvalue(inputNum.value)
            return !!(Number(card) && card.length === 16);
            },
            errorMessage: 'Номер не корректный'
    }
   ])
  .addField('.form__input_date', [{
    rule: 'required',
    errorMessage: 'Укажите срок действия карты'
  },
  {
    validator(value) {
      let userDate = new Date('20'+value.split(' / ').reverse().join('-') )
      if (!(userDate instanceof Date && !isNaN(userDate))){
        // Do not do something (date is invalid)
        // but return
        return false
      }
      // Card is not expired, continiue processing
      return true
    },
    errorMessage : 'Введена не дата'
  },
  {
    validator(value) {
      let userDate = new Date('20'+value.split(' / ').reverse().join('-') )
      const year30 = new Date('2030-12-31')
      let currentDate = new Date()
      if (userDate < currentDate) {
        // Card expired, return
        return false
      }
      // Card is not expired, continiue processing
      return true
    },
    errorMessage : 'Срок действия истёк'
  },
  {
    validator(value) {
      let userDate = new Date('20'+value.split(' / ').reverse().join('-') )
      const year30 = new Date('2030-12-31')
      let currentDate = new Date()
      if (userDate > year30){
        // too late, return
        return false
      }
      // Card is not expired, continiue processing
      return true
    },
    errorMessage : 'Карта позже 30 года'
  }
])
  .addField('.form__input_cvv', [{
    rule: 'required',
    errorMessage: 'Введите CVV'
  },
  { 
   
    validator(value) {
      const cvv = cvvMask.unmaskedvalue(inputCvv.value);
      return !!(Number(cvv) && cvv.length === 3);
      
    },
    errorMessage: 'CVV не корректный'
  }
])
   .onSuccess(event => {
    
     const target = event.target;
     axios.post('https://jsonplaceholder.typicode.com/posts', {
      name: target.name.value, 
      card: target.card.value,
      term: target.term.value,
      cvv: target.cvv.value,
    })
    .then(response => {
      target.reset();
      checkTitle.textContent = `Спасибо, ваша карта принята, номер заявки ${response.data.id}!`

    }) 
     .catch(err => {
       checkTitle.textContent = `Что-то пошло не так, попробуйте снова!`;
       checkTitle.style.color = 'red';
    })
   });





    
// Есть дата в формате MM/YY ('11 / 11')
// Нужно: 
// - выделить год и месяц
// - сравнить с текущими
// - сравнить с 30 годом на кой-то хер
// - Если проверка не пройдена, дать об знать.


// const form = document.querySelector('.payment__form');

// form.submit(function (event) {
//   event.preventDefault();
//   $.ajax({
//     url: 'https://jsonplaceholder.typicode.com/todos',
//     type: 'POST',
//     data: $(this).serialize(),
//     success(data) {
//       modalOrderTitle.text('Спасибо, ваша карта принята, номер заявки ' + data.id)
//       $('.modal-order__form').slideUp(300);
//     },
//     error() {
//       modalOrderTitle.text('Что-то пошло не так, попробуйте позже')
//     }
    
//   })
// })
//   form.reset()