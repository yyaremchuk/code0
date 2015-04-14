describe('layaout test suit', function() {

	beforeEach(function() {
		browser.get('http://localhost:3000');
	});

	it('main layout check', function() {
		// console.log(browser.getTitle());
		expect(browser.getTitle()).toEqual('Movie and TV Series manager');
	});

	it('tabs check', function() {
		//console.log(element.find('.tab-pane'));

		// all tabs
		expect(element.all(by.css('.tab-pane')).count()).toEqual(4);
	});

	
});