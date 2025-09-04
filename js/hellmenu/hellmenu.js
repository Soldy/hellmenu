/**
 *
 * @author 501dy
 * @version 0.0.0a
 * @copyright GPLv3
 * @file Menu Plugin for Hell
 * @desc This module provides a customizable 
 *  menu for the Hell pages. The Hell pages can generate their
 *  own menus using the AXPN format with the hellmenu. Also, 
 *  it can be used as a standalone class.
 *
 * @todo This needs to be redesigned.
 *  Currently, it relies on IDs, but we can store
 *  the element directly to avoid repeatedly calling
 *  getElementById. This approach saves both time and resources.
**/

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
    this.add = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_,
      subs_
    ){
        _add(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          subs_
        );
    };

    /**
     *
     * @public
    **/
    this.render = function(){
        return _render();
    };

    /**
     *
     * @public
    **/
    this.hide = function(){
        _menu.className = _class('hide');
    };

    /**
     *
     * @public
    **/
    this.show = function(){
        _menu.className = _class('shell');
    };

    /**
     *
     * @public
    **/
    this.id = function(name){
        return _id(name);
    };

    /**
     *
     * @public
    **/
    this.setTitle = function(id, title){
        return _menuTextChange(id, title); 
    };

    /**
     *
     * @public
    **/
    this.setIcon = function(id, icon){
        return _menuIconChange(id, icon); 
    };
    const _create = (tag)=>document.createElement(tag);

    /**
     *
     * @private
     * @type {number}
    **/
    const _render_section_serial = 0;


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
    **/
    const _addMenu = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_
    ){
        _list_menus[id_.toString()] = {
            'id':id_.toString(),
            'title':title_.toString(),
            'action':action_,
            'icon_class':icon_class_.toString(),
            'section':section_
        };
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {string}
     * @private
    **/
    const _add = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_,
      subs_
    ){
        if(typeof section_ !== 'string')
            section_ = 'main';
        _addMenu(
          id_,
          title_,
          action_,
          icon_class_,
          section_
        );
        _list_menus[id_].subs = _subCopy(subs_);
        _menuAddToSection(
          id_,
          section_
        );
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {string}
     * @param {DOMElement}
     * @private
    **/
    const _addSub = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_,
      subs_
    ){
        if (typeof section_ === 'undefined')
            throw Error('Missing parent menu section');
        _addMenu(id_, title_, action_, icon_class_,  section_);
        _list_menus[id_].subs = _subCopy(subs_);
        _menuAddToSubSection(id_, section_);
   };

    /**
     *
     * @param {string}
     * @param {string}
     * @private
    **/
    const _addSection = function(id_, title_){
        if(typeof _list_sections[id_] === 'undefined')
            _list_sections[id_] = {
                menus:[]
            };
        if(typeof title_ === 'string')
            _list_sections[id_].title = title_;
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @private
    **/
    const _addSubSection = function(menu_, title_){
        if(typeof _list_sub_sections[menu_] === 'undefined')
            _list_sub_sections[menu_] = {
                menus:[]
            };
        if(typeof title === 'string')
            _list_sub_sections[menu_].title = title_;
    };

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _id = (name_)=>{
        return ('hellmenu_id_'+name_);
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

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _class = (name_)=>{
        return ('hellmenu'+_upper(name_));
    };

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _subClass = (name_)=>{
        return ('hellmenuSub'+_upper(name_));
    };

    /**
     *
     * @param {Array<string>}
     * @private
     * @return {Array<string>}
    **/
    const _subCopy = (sub_)=>{
        if(typeof sub_ === 'undefined')
            return [];
        return sub_;
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @private
     * @return {string}
    **/
    const _sectionElement = function(id_, class_){
        let section  = _create('section');
        section.className = class_;
        section.setAttribute('id', _id(id_));
        return section;
    };

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _section = function(id_){
        let section = _sectionElement(id_, _class('section'));
        for(let i of _list_sections[id_].menus){
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

    /**
     *
     * @param {string}
     * @private
     * @return {string}
    **/
    const _subSection = function(id_){
        let section = _sectionElement(id_, _subClass('section'));
        for(let i of _list_sub_sections[id_].menus)
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

    /**
     *
     * @param{string}
     * @param{string}
     * @private
     * @return {DOMElement}
    **/
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

    /**
     *
     * @param{string}
     * @param{string}
     * @private
    **/
    const _menuAddToSection = function (
      menu_,
      section_
    ){
        _addSection(section_);
        _menuRemoveFormSection(menu_);
        _list_sections[section_].menus.push(menu_);
        _list_menus[menu_].section = section_;
    };

    /**
     *
     * @param{string}
     * @param{string}
     * @private
    **/
    const _menuAddToSubSection = function (
      menu_,
      section_
    ){
        _addSubSection(section_);
        _menuRemoveFormSection(menu_);
        _list_sub_sections[section_].menus.push(menu_);
        _list_menus[menu_].section = section_;
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


