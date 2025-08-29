'use strict';

const hellMenuClass = function(){

    /**
     *
     * @param {string}
     * @param {string}
     * @public
    **/
    this.addSection = function(id_, title_){
        _addSection(id_, title_);
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @public
    **/
    this.addSubSection = function(menu_, title_){
        _addSubSection(menu_, title_);
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {string}
     * @param {DOMElement|Array.<DOMElement>}
     * @public
    **/
    this.addSub = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_,
      subs_
    ){
        _addSub(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          subs_
        );
    };
    this.add = function(id, title, action, icon_class,  section, subs){
        _add(id, title, action, icon_class,  section, subs);
    };
    this.render = function(){
        return _render();
    };
    this.hide = function(){
        _menu.className = _class('hide');
    };
    this.show = function(){
        _menu.className = _class('shell');
    };
    this.id = function(name){
        return _id(name);
    };
    this.setTitle = function(id, title){
        return _menuTextChange(id, title); 
    };
    this.setIcon = function(id, icon){
        return _menuIconChange(id, icon); 
    };
    const _create = (tag)=>document.createElement(tag);

    /**
     *
     * @private
     * @type {Object<string, DOMElement>}
    **/
    const _list_menus = {};

    /**
     *
     * @private
     * @type {Object<string, DOMElement>}
    **/
    const _list_sections = {}; 

    /**
     *
     * @private
     * @type {Object<string, DOMElement>}
    **/
    const _list_sub_sections = {}; 

    /**
     *
     * @private
     * @type {DOMElement}
    **/
    const _menu  = _create('div');

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {string}
     * @private
     * @return {DOMElement}
    **/
    const _addMenu = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_
    ){
        _list_menus[id_toString()] = {
            id_.toString(),
            title_.toString(),
            action_,
            icon_class_.toString(),
            section_
        };
    };
    const _add = function(id, title, action, icon_class,  section, subs){
        if(typeof section !== 'string')
            section = 'main';
        _addMenu(id, title, action, icon_class,  section);
        _list_menus[id].subs = _subCopy(subs);
        _menuAddToSection(id,section);
    };
    const _addSub = function(id, title, action, icon_class,  section, subs){
        if (typeof section === 'undefined')
            throw Error('Missing parent menu section');
        _addMenu(id, title, action, icon_class,  section);
        _list_menus[id].subs = _subCopy(subs);
        _menuAddToSubSection(id,section);
    };
    const _addSection = function(id,title){
        if(typeof _list_sections[id] === 'undefined')
            _list_sections[id] = {
                menus:[]
            };
        if(typeof title === 'string')
            _list_sections[id].title = title;
    };
    const _addSubSection = function(menu,title){
        if(typeof _list_sub_sections[menu] === 'undefined')
            _list_sub_sections[menu] = {
                menus:[]
            };
        if(typeof title === 'string')
            _list_sub_sections[menu].title = title;
    };

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _id = (name)=>{
        return ('hellmenu_id_'+name);
    };

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _upper = (in_)=>{
      return (
        in_[0].toUpperCase() + in_.slice(1)
      );
    };
    const _class = (name)=>{
        return ('hellmenu'+_upper(name));
    };
    const _subClass = (name)=>{
        return ('hellmenuSub'+_upper(name));
    };
    const _subCopy = (sub)=>{
        if(typeof sub === 'undefined')
            return [];
        return sub;
    };
    const _sectionElement = function(id, class_){
        let section  = _create('section');
        section.className = class_;
        section.setAttribute('id', _id(id));
        return section;
    };
    const _section = function(id){
        let section = _sectionElement(id, _class('section'));
        for(let i of _list_sections[id].menus){
            section.appendChild(
                _menuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
            if(typeof _list_sub_sections[i] === 'undefined')
                continue;
            section.appendChild(
                _subSection(i)
            );
        }
        return section;
    };
    const _subSection = function(id){
        let section = _sectionElement(id, _subClass('section'));
        for(let i of _list_sub_sections[id].menus)
            section.appendChild(
                _subMenuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
        return section;
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {string}
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {DOMElement|Array.<DOMElement>}
     * @private
     * @return {DOMElement}
    **/
    const _menuElements = function(
      id_,
      menu_class_,
      icon_class_,
      text_class_,
      title_text_,
      action_,
      subs_
    ){
        const menu  = _create('div');
        const icon  = _create('span');
        const title = _create('a');
        menu.className = menu_class_;
        icon.className  = icon_class_;
        title.className = text_class_;
        title.appendChild(
            document.createTextNode(title_text_)
        );
        menu.appendChild(
            icon
        );
        menu.appendChild(
            title
        );
        menu.setAttribute('id', _id(id_));
        icon.addEventListener(
            'click',
            action_,
            false
        );
        title.addEventListener(
            'click',
            action_,
            false
        );
        if(Array.isArray(subs_))
            for(let i of subs_)
                menu.appendChild(
                    _subPoint(i.id, i.icon_class, i.action)
                );
        return menu
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {DOMElement|Array.<DOMElement>}
     * @private
     * @return {DOMElement}
    **/
    const _menuPoint = function(
      id_,
      title_text_,
      action_,
      icon_class_,
      subs_
    ){
        if(typeof icon_class_ === 'undefined')
            icon_class_ = '';
        return _menuElements(
            id_,
            _class('line'),
            _class('menuitemIcon '+icon_class_),
            _class('text'),
            title_text_,
            action_,
            subs_
        );
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {DOMElement|Array.<DOMElement>}
     * @private
     * @return {DOMElement}
    **/
    const _subMenuPoint = function(
      id_,
      title_text_,
      action_,
      icon_class_,
      subs_
    ){
        if(typeof icon_class_ === 'undefined')
            icon_class_ = '';
        return _menuElements( 
            id_,
            _subClass('line'),
            _subClass('menuitemIcon '+icon_class_),
            _subClass('text'),
            title_text_,
            action_,
            subs_
        );
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @private
     * @return {DOMElement}
    **/
    const _subPoint=function(
      id_,
      icon_class_,
      action_
    ){
        const sub = _create('span');
        sub.setAttribute('id', id_);
        sub.addEventListener(
            'click',
            action_,
            false
        );
        return sub;

    };

    /**
     * @param{string}
     * @param{string}
     * @private
     * @return {DOMElement}
    **/
    const _menuTextChange = function(
      id_,
      title_
    ){
        document.getElementById(_id(id_))
            .getElementsByTagName('a')[0]
            .textContent= title_.toString();
    };

    /**
     *
     * @param{string}
     * @param{string}
     * @private
     * @return {DOMElement}
    **/
    const _menuIconChange = function(
      id_,
      icon_
    ){
        const el = (
            document.getElementById(_id(id_))
        ).getElementsByTagName('span')[0];
        let className = el.className;
        className = (className.split(' '))[0];
        el.className = (className+' '+icon_);
    };
    const _menuRemoveFormSection = function(menu){
        if(typeof _list_menus[menu].section !== 'string')
            return ;
        const section = _list_menus[menu].section;
        let index = 0;
        if(typeof _list_sections[section] !== 'undefined'){
            index = _list_sections[
                section
            ].menus.indexOf(menu);
            if(index !== -1 )
                _list_sections[
                    section
                ].menus.splice(index, 1);
        }
        if(typeof _list_sub_sections[section] !== 'undefined'){
            index = _list_sub_sections[
                section
            ].menus.indexOf(menu);
            if(index !== -1 )
                _list_sub_sections[
                    section
                ].menus.splice(index, 1);
        }
    };
    const _menuAddToSection = function (menu,section){
        _addSection(section);
        _menuRemoveFormSection(menu);
        _list_sections[section].menus.push(menu);
        _list_menus[menu].section = section;
    };

    const _menuAddToSubSection = function (
      menu_,
      section_
    ){
        _addSubSection(section_);
        _menuRemoveFormSection(menu_);
        _list_sub_sections[section].menus.push(menu_);
        _list_menus[menu].section = section;
    };

    /**
     *
     * @private
     * @return {DOMElement}
    **/
    const _render = function(){
        _menu.innerHTML = '';
        for(let i in _list_sections)
            _menu.appendChild(
                _section(i)
            );
        return _menu;
    };
    // constructor
};


