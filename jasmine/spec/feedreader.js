$(function() {

    // suite for checking the allFeeds variable 
    describe('RSS Feeds', function() {

        // spec for checking the allFeeds is defined 
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // spec for checking the url is defined and not empty
        it('url defined and not empty', function(){
            for(i in allFeeds){
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        // spec for checking the name is defined and not empty
        it('name defined and not empty', function(){
            for(i in allFeeds){
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* suite for checking the side menu working "The menu" */
    describe('The menu', function(){

        // spec for the checking the side menu is hidden by default
        it('menu hidden', function(){
            var classList = $('body').attr('class');
            expect(classList).toContain('menu-hidden');
        });

        // checking the toggling effect of the side menu 
        it('menu change', function(){
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            var classList = $('body').attr('class');
            expect(classList).not.toContain('menu-hidden');
            menuIcon.click(); 
            var classList = $('body').attr('class');
            expect(classList).toContain('menu-hidden');
        });

    });
    /*checking the "Initial Entries" */
    describe('Inital Entries', function(){

        // loading the feed  before each spec 
        var isFeedLoadcalled = false;
        beforeEach(function (done) {
            isFeedLoadcalled = true;
            loadFeed(0,done);

        });

        // checking the existence of atleast single entry in the feed 
        it('feed container contains at least single entry', function (done) {
            expect(isFeedLoadcalled).toBe(true);
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* checking the "New Feed Selection" */
    describe('New Feed Selection', function(){

    
        // loading the first feed before each spec
        var prev, next;
        beforeEach(function (done) {
            loadFeed(0,function(){
                prev=$('.feed').html();
                loadFeed(1,function(){
                    next=$('.feed').html();
                    done();
                });
            });
            // asyncFun(done);
        });

        // chaning the feed and checking the new feed is loaded
        it('content changed when new feed is loaded', function(done){
            expect(prev).not.toEqual(next);           
            done();
        });
    });
}());
