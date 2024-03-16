if (typeof window.$docsify === 'object') {
    window.$docsify.plugins = [].concat((hook, vm) => {
        const SCROLL_DELAY = 2000;
        const scrollCurrentElement = () => {
            const location = window.location;

            const currentUrlWithoutHash = new URL(
                location.origin + location.pathname +
                location.search + location.hash.substring(1)
            );

            const urlQueryParam = currentUrlWithoutHash.searchParams;
            if (!urlQueryParam.has('id'))
                return;

            const urlId = urlQueryParam.get('id');
            // run delayed, to make sure everything loaded
            setTimeout(function () {
                try {
                    document.querySelector(`#${urlId}`).scrollIntoView({ behavior: "smooth" });
                } catch (e) { }
            }, SCROLL_DELAY);
        };

        hook.ready(scrollCurrentElement);
        window.addEventListener("hashchange", scrollCurrentElement);
    }, $docsify.plugins);
}