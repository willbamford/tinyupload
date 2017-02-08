import hasDnd from './hasDnd';

var on = function on(element, names, fn) {
  names.split(' ').map(function (name) {
    element.addEventListener(name, fn);
  });
};

var create = function create(mount, handleChange) {
  var isDnd = hasDnd();

  var html = '\n    <form class="tu' + (isDnd ? ' tu--has-dnd' : '') + '" method="post" action="" enctype="multipart/form-data">\n      <div class="tu__input">\n        <svg class="tu__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>\n        <input class="tu__file" type="file" name="files[]" id="tu-file-input" data-multiple-caption="{count} files selected" multiple />\n        <label for="tu-file-input"><strong>Choose a file</strong><span class="tu__dnd"> or drag it here</span>.</label>\n        <button class="tu__button" type="submit">Upload</button>\n      </div>\n      <div class="tu__uploading">Uploading&hellip;</div>\n      <div class="tu__success">Done!</div>\n      <div class="tu__error">Error! <span></span>.</div>\n    </form>\n  ';

  var container = document.createElement('div');
  container.innerHTML = html;
  mount.appendChild(container);

  var form = container.querySelector('.tu');
  var fileInput = container.querySelector('#tu-file-input');

  on(fileInput, 'change', function (e) {
    console.log('Selected', fileInput.files);
    console.log(fileInput.files);
  });

  if (isDnd) {
    var swallow = function swallow(e) {
      e.preventDefault();
      e.stopPropagation();
    };

    on(form, 'drag dragstart dragend dragover dragenter dragleave drop', swallow);
    on(form, 'dragover dragenter', function () {
      return form.classList.add('tu--is-dragover');
    });
    on(form, 'dragleave dragend drop', function () {
      return form.classList.remove('tu--is-dragover');
    });
    on(form, 'drop', function (e) {});
  }

  return {};
};

export default create;