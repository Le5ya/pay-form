const inputNum= document.querySelector('.form__input_big_num');
const cardMask = new Inputmask('9999 9999 9999 9999');

cardMask.mask(inputNum);

const justValidate = new JustValidate('.payment__form');

justValidate
  .addField('.form__input_big_name', [
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
  .addField('.form__input_big_num', [
    {
      rule: 'required',
      errorMessage: 'Укажите номер карты'
    },
    {
      validator(value) {
        const card = inputNum.inputmask.unmaskedvalue();
        return !!(Number(card) && phone.length === 16);
      },
      errorMessage: 'Номер не корректный'
    }
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