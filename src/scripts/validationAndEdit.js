/// Validation ///
const langRu = { 
  validationLenght: 'Должно быть от 2 до 30 символов',
  required: 'Это обязательное поле'
}

function validator (e) {
  const error = document.querySelector(`#error-${e.id}`);

  if (!e.checkValidity()) {
      if (e.value.length === 0) {
        error.textContent = langRu.required;
      } else {
        error.textContent = langRu.validationLenght;
      }
      return false;
  }

  error.textContent = '';

  return true;
};

function profileEditorHandler(e) {
    event.preventDefault();

    const inputs = Array.from(editForm.elements);    
   
    let valid = true;

    inputs.forEach((e) => {
      if (e.id !== saveAboutMe.id) {
        if (!validator(e)) { 
          valid = false;
        }
      } 
    });

    if (valid) {
      api.upDateUserInfo(editName.value, editAboutMe.value)
          .then((res) => {
            name.textContent = res.name;
            aboutMe.textContent = res.about;
            saveAboutMe.classList.remove('button__active');
            popEdit.classList.remove('popup_is-opened');    
          })
          .catch(err => {
            console.log(err);
          });
    }

    editForm.reset();
}

export {validator, profileEditorHandler};