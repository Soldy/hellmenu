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
        _rendered = false;
        _addSection(id_, title_);
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @public
    **/
    this.addSubSection = function(menu_, title_){
        _rendered = false;
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
      subs_,
      help_
    ){
        _rendered = false;
        _addSub(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          subs_,
          help_
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
     * @param {string}
     * @public
    **/
    this.add = function(
      id_,
      title_,
      action_,
      icon_class_,
      section_,
      subs_,
      help_
    ){
        _rendered = false;
        _add(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          subs_,
          help_
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
     * @param {string}
     * @param {string}
     * @param {string}
     * @public
    **/
    this.setTitle = function(
      id_,
      title_,
      help_ = ''
    ){
        return _menuTextChange(id_, title_, help_); 
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @public
    **/
    this.setIcon = function(id_, icon_){
        if (
          (typeof icon_ == 'undefined') ||
          (typeof id_ == 'undefined') ||
          (!_icons.has(id_))
        )
            return;
        return _menuIconChange(id_, icon_); 
    };

    /**
     *
     * @param {string}
     * @public
     * @return {DOMElement}
    **/
    const _create = (tag)=>document.createElement(tag);

    /**
     *
     * @private
     * @type {number}
    **/
    let _render_section_serial = 0;

    /**
     *
     * @private
     * @type {number}
    **/
    let _rendered = false;

    /**
     *
     * @type {Map<string, DOMElement>
     **/
     const _menus = new Map();

    /**
     *
     * @type {Map<string, DOMElement>
     **/
     const _icons = new Map();

    /**
     *
     * @type {Map<string, string>
     **/
     const _icons_class = new Map();

    /**
     *
     * @type {Map<string, DOMElement>
     **/
     const _titles = new Map();


    /**
     *
     * @private
     * @type {Object<string, DOMElement>}
    **/
    const _list_menus = new Map();

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
      section_,
      help_ = ''
    ){
        _list_menus.set(id_, {
            'id':id_.toString(),
            'title':title_.toString(),
            'action':action_,
            'icon_class':icon_class_.toString(),
            'section':section_,
            'help':help_.toString()
        });
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
      subs_,
      help_
    ){
        if(typeof section_ !== 'string')
            section_ = 'main';
        _addMenu(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          help_
        );
        const map = _list_menus.get(id_);
        map.subs = _subFix(subs_);
        _list_menus.set(id_, map);
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
      subs_,
      help_
    ){
        if (typeof section_ === 'undefined')
            throw Error('Missing parent menu section');
        _addMenu(
          id_,
          title_,
          action_,
          icon_class_,
          section_,
          help_
        );
        const map = _list_menus.get(id_);
        map.subs = _subFix(subs_);
        _list_menus.set(id_, map);
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
        if(typeof title_ === 'string')
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
      if (typeof in_ === 'undefined')
          return '';
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
    const _subFix = (sub_)=>{
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
        let section;
        if (_render_section_serial === 0) {
            section = _sectionElement(
              id_,
              (
                _class('section')+
                ' '+
                _class('sectionFirst')
              )
            );
        } else {
            section = _sectionElement(
              id_,
              _class('section')
            );
        }
        _render_section_serial++;
        for(let i of _list_sections[id_].menus){
            const map = _list_menus.get(i);
            section.appendChild(
                _menuPoint(
                    map.id,
                    map.title,
                    map.action,
                    map.icon_class,
                    map.subs,
                    map.help
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
        for(let i of _list_sub_sections[id_].menus){
            const map = _list_menus.get(i);
            section.appendChild(
                _subMenuPoint(
                  map.id,
                  map.title,
                  map.action,
                  map.icon_class,
                  map.subs,
                  map.help
                )
            );
        }
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
     * @param {string}
     * @private
     * @return {DOMElement}
    **/
    const _menuElements = function(
      id_,
      menu_class_,
      icon_class_,
      text_class_,
      title_text_,
      action_ = ()=>{},
      subs_ = [],
      help_ = ''
    ){
        const menu  = _create('div');
        const icon  = _create('span');
        const title = _create('a');
        menu.className = menu_class_;
        _menus.set(id_, menu);
        icon.className  = icon_class_;
        _icons.set(id_, icon);
        title.className = text_class_;
        _titles.set(id_, title);
        title.setAttribute(
          'href',
          '#'
        );
        title.setAttribute(
          'title',
          help_
        );
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
        if (typeof action_ == 'function'){
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
        }
        if(Array.isArray(subs_))
            for(let i of subs_)
                menu.appendChild(
                    _subPoint(i.id, i.icon_class, i.action)
                );
        return menu;
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {DOMElement|Array.<DOMElement>}
     * @param {string}
     * @private
     * @return {DOMElement}
    **/
    const _menuPoint = function(
      id_,
      title_text_,
      action_,
      icon_class_,
      subs_ = [],
      help_ = ''
    ){
        const menu = _menuElements(
            id_,
            _class('line'),
            _class('menuitemIcon'),
            _class('text'),
            title_text_,
            action_,
            subs_,
            help_
        );
        if(typeof icon_class_ != 'undefined')
            _menuIconChange(
              id_,
              icon_class_
            );
        return menu;
    };

    /**
     *
     * @param {string}
     * @param {string}
     * @param {function}
     * @param {string}
     * @param {DOMElement|Array.<DOMElement>}
     * @param {string}
     * @private
     * @return {DOMElement}
    **/
    const _subMenuPoint = function(
      id_,
      title_text_,
      action_,
      icon_class_,
      subs_ = [],
      help_ = ''
    ){
        const submenu = _menuElements( 
            id_,
            _subClass('line'),
            _subClass('menuitemIcon'),
            _subClass('text'),
            title_text_,
            action_,
            subs_,
            help_
        );
        if(typeof icon_class_ != 'undefined')
            _menuIconChange(
              id_,
              icon_class_
            );
        return submenu;
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
      action_ = ()=>{}
    ){
        const sub = _create('span');
        sub.setAttribute('id', id_);
        sub.addEventListener(
          'click',
          action_,
          false
        );
        _icons.set(id_, sub);
        _menuIconChange(id_, icon_class_);
        return sub;

    };

    /**
     * @param{string}
     * @param{string}
     * @param{string}
     * @private
     * @return {DOMElement}
    **/
    const _menuTextChange = function(
      id_,
      title_,
      help_ = ''
    ){
        if (
          (!_titles.has(id_)) ||
          (!_list_menus.has(id_))
        )
            return ;
        const map = _list_menus.get(id_);
        map.title = title_.toString();
        map.help = help_.toString();
        _list_menus.set(id_, map);
        (_titles.get(id_)).textContent = title_.toString();
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
        if (_icons_class.has(id_))
            (_icons.get(id_)).classList.remove(
              _icons_class.get(id_)
            );
        const map = _list_menus.get(id_);
        map.icon_class = icon_.toString();
        _list_menus.set(id_, map);
        _icons_class.set(id_, icon_);
        (_icons.get(id_)).classList.add(icon_);
    };

    /**
     *
     * @param{string}
     * @private
     * @return {DOMElement}
    **/
    const _menuRemoveFormSection = function(menu_){
        const map = _list_menus.get(menu_);
        if(typeof map.section !== 'string')
            return ;
        const section = map.section;
        let index = 0;
        if(typeof _list_sections[section] !== 'undefined'){
            index = _list_sections[
                section
            ].menus.indexOf(menu_);
            if(index !== -1 )
                _list_sections[
                    section
                ].menus.splice(index, 1);
        }
        if(typeof _list_sub_sections[section] !== 'undefined'){
            index = _list_sub_sections[
                section
            ].menus.indexOf(menu_);
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
        _menuRemoveFormSection(menu_);
        _addSection(section_);
        _list_sections[section_].menus.push(menu_);
        const map = _list_menus.get(menu_);
        map.section = section_;
        _list_menus.set(menu_, map);
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
        _menuRemoveFormSection(menu_);
        _addSubSection(section_);
        _list_sub_sections[section_].menus.push(menu_);
        const map = _list_menus.get(menu_);
        map.section = section_;
        _list_menus.set(menu_, map);
    };

    /**
     *
     * @private
     * @return {DOMElement}
    **/
    const _render = function(){
        if (_rendered === true)
            return _menu;
        _menu.innerHTML = '';
        _render_section_serial = 0;
        for(let i in _list_sections)
            _menu.appendChild(
                _section(i)
            );
        _rendered = true;
        return _menu;
    };
    // constructor
};
