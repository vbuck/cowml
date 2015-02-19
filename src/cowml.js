// Licensing, copyrights, moo moo moo
var CowML = {

    dna: {
        options: {
            mode    : 'transform',
            context : null
        },
        schema: {}
    },

    /**
     * DNA strand joiner.
     * 
     * @param object a Uhh, an object.
     * @param object b Uhh, an object.
     * 
     * @return object
     */
    extend: function(a, b) {
        for (var x in b) {
            // Merge options and schema only
            if (x == 'schema' || x == 'options') {
                for (var y in b[x]) {
                    a[x][y] = b[x][y];
                }
            } else {
                a[x] = b[x];
            }
        }

        return a;
    },

    /**
     * Because context is king.
     * 
     * @return HTMLElement
     */
    getContext: function() {
        var context = this.dna.options.context;

        if (typeof context == 'string') {
            var nodes = document.querySelectorAll(this.dna.options.context);
            
            if (nodes.length) {
                return nodes[0];
            }
        } else if (context !== null && typeof context == 'object') {
            return context;
        }

        return document.body;
    },

    /**
     * Make something out of nothing.
     * 
     * @return void
     */
    initialize: function() {
        this.onReady(this.load);
    },

    /**
     * DNA strand processor.
     * 
     * @return CowML
     */
    load: function() {
        var dna = document.querySelectorAll('script[data-type="cowmlx"]');

        for (var i = 0; i < dna.length; i++) {
            CowML.dna = CowML.extend(CowML.dna, JSON.parse(dna[i].text));
        }
        var context = CowML.getContext();  // markup context
        context.innerHTML = CowML.parse(context);

        return this;
    },

    /**
     * At the appointed time.
     *
     * @todo IE support
     * 
     * @return CowML
     */
    onReady: function(callback) {
        document.addEventListener('DOMContentLoaded', callback, false);

        return this;
    },

    /**
     * The CowML birth room.
     * 
     * @param string|object html The input content or element.
     * 
     * @return string
     */
    parse: function(html) {
        // Support live cows
        if (html !== null && typeof html == 'object' && 'getElementsByTagName' in html) {
            html = html.innerHTML;
        }

        // Setup the calf delivery room
        var barn = document.createElement('div'),
            mode = this.dna.options.mode;

        // Inseminate
        barn.innerHTML = html;

        for (var key in this.dna.schema) {
            // Those who were pre-destined are chosen
            var strand = this.dna.schema[key],
                herd = barn.getElementsByTagName(key),
                toDust = [],
                headOfCattle,
                calf;

            for (var i = 0; i < herd.length; i++) {
                headOfCattle = herd[i];

                // Fetal development
                if (mode == 'update') {
                    calf = document.createElement(key);
                } else {
                    calf = document.createElement(strand.type);
                }

                // In the womb they were formed
                this.writeAttributes(calf, strand.attributes || {})
                    .writeCss(calf, strand.css || {});

                calf.innerHTML = headOfCattle.innerHTML;

                headOfCattle.parentNode.insertBefore(calf, headOfCattle);

                if (mode == 'update') {
                    headOfCattle.parentNode.removeChild(headOfCattle);
                } else {
                    toDust.push(headOfCattle);
                }
            }

            for (var index in toDust) {
                toDust[index].parentNode.removeChild(toDust[index]);
            }
        }

        // Now go forth, and make disciples on the earth
        return barn.innerHTML;
    },

    /**
     * Calf pre-destination labratory.
     * 
     * @param object calf       A calf fetus.
     * @param object attributes Maker's choice ingredients.
     * 
     * @return CowML
     */
    writeAttributes: function(calf, attributes) {
        for (var name in attributes) {
            calf.setAttribute(name, attributes[name]);
        }

        return this;
    },

    /**
     * Butter faces.
     * 
     * @param object calf A calf fetus.
     * @param object css  Maker's discretion.
     * 
     * @return CowML
     */
    writeCss: function(calf, css) {
        for (var property in css) {
            calf.style[property] = css[property];
        }

        return this;
    }

};

CowML.initialize();