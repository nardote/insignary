import { observable } from 'mobx';

class pageStore {
	@observable quickReference = {
		title: 'Quick Reference',
		content: '</p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consectetur porttitor felis et ultrices. Etiam vel arcu lobortis, pulvinar ipsum in, mollis ligula. Vestibulum non tellus congue magna ultrices hendrerit. Etiam commodo justo quis neque varius auctor. Proin velvulputate justo. Aenean tincidunt pulvinar nunc, sit amet maximus purus scelerisque vitae. Mauris gravida tempor massa, non auctor mauris feugiat sit amet.</p></p>Sed vel nulla pulvinar, congue est et, bibendum turpis. Etiam interdum, neque eget viverra auctor, eros velit porta mauris, in convallis mauris dolor non turpis. Ut commodo nulla enim, id iaculis neque tristique id. Sed interdum nisl sit amet elit tempor, non dictum ipsum bibendum. Aliquam erat volutpat. Duis at molestie sem. Praesent sit amet convallis lectus, non consequat justo. Ut eleifend purus et lorem convallis, in rutrum diam pellentesque. Phasellus et lacus nibh. Donec scelerisque libero vitae varius dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean in congue ex.</p><p>Curabitur venenatis bibendum enim, id posuere libero interdum sed. Proin ligula massa, interdum id bibendum nec, tincidunt nec enim. Nullam in nisl at metus lobortis luctus vel sed felis. Sed tincidunt condimentum diam, in tempus orci commodo quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In sit amet dui consequat, sagittis est id, sagittis neque. Sed sit amet massa suscipit, gravida massa vitae, maximus quam. Nam bibendum lectus et imperdiet vestibulum. Integer arcu libero, tempus vel tincidunt et, pulvinar ut justo. Nunc ullamcorper sem sed arcu tempor pulvinar. Suspendisse vel tempor mi. Fusce porttitor sapien volutpat metus tincidunt tincidunt vitae at mi. Curabitur ac placerat urna, convallis lacinia arcu. Praesent at nisi in lorem pulvinar auctor.</p>'
	};

	@observable scanning = {
		title: 'Scanning',
		content: 'Test test test'
	};

	@observable reviewResult = {
		title: 'reviewResult',
		content: 'Test test test'
	};

	@observable exportingResult = {
		title: 'exportingResult',
		content: 'Test test test'
	};

}


export default pageStore;