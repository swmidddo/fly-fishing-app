
const fs = require('fs');
const content = fs.readFileSync('regulations.js', 'utf8');
eval(content.replace('const REGULATIONS =', 'global.REGULATIONS ='));

function matchStateRule(cleanSpecies, stateCode) {
    const clean = cleanSpecies.toLowerCase().trim();
    if (!stateCode || !global.REGULATIONS[stateCode]) {
        return null;
    }
    const st = global.REGULATIONS[stateCode];
    const rules = [...(st.freshwater || []), ...(st.saltwater || [])];

    // 1. Direct exact or substring
    let match = rules.find(r => r.name.toLowerCase() === clean || r.name.toLowerCase().includes(clean) || clean.includes(r.name.toLowerCase()));
    if (match) return { rule: match, stateName: st.stateName, stateCode };

    // 2. Token / Fish root matching
    const PRIMARY_FISH_TOKENS = [
        'flounder', 'trout', 'snapper', 'bream', 'trevally', 'flathead', 'cod', 'whiting',
        'perch', 'salmon', 'tailor', 'bonito', 'kingfish', 'mackerel', 'tuna', 'dory',
        'mullet', 'garfish', 'leatherjacket', 'shark', 'ray', 'bass', 'barramundi',
        'jack', 'nannygai', 'jewfish', 'mulloway', 'carp', 'redfin', 'gurnard', 'morwong',
        'luderick', 'drummer', 'groper', 'sweep', 'sole', 'teraglin', 'samson'
    ];
    const cleanTokens = clean.split(/[\s/(),&]+/).filter(t => t.length >= 3);

    for (const r of rules) {
        const rTokens = r.name.toLowerCase().split(/[\s/(),&]+/).filter(t => t.length >= 3);
        const common = cleanTokens.filter(t => rTokens.includes(t));
        if (common.length > 0) {
            if (common.some(t => PRIMARY_FISH_TOKENS.includes(t)) || common.length >= 2) {
                return { rule: r, stateName: st.stateName, stateCode };
            }
        }
    }

    return null;
}

const tests = [
    { species: 'Longsnout Flounder', state: 'NSW', expectedState: 'NSW', expectedBag: '10' },
    { species: 'Greenback Flounder', state: 'NSW', expectedState: 'NSW', expectedBag: '10' },
    { species: 'Flounder', state: 'WA', expectedState: 'WA', expectedBag: '8' },
    { species: 'Flounder', state: 'VIC', expectedState: 'VIC', expectedBag: '20' },
    { species: 'Dusky Flathead', state: 'NSW', expectedState: 'NSW', expectedBag: '5' },
    { species: 'Sand Flathead', state: 'VIC', expectedState: 'VIC', expectedBag: '20' },
    { species: 'Pink Snapper', state: 'NSW', expectedState: 'NSW', expectedBag: '10' },
    { species: 'Snapper', state: 'SA', expectedState: 'SA' },
    { species: 'Brown Trout', state: 'NSW', expectedState: 'NSW', expectedBag: '5' },
    { species: 'Barramundi', state: 'NT', expectedState: 'NT', expectedBag: '3' },
    { species: 'Barramundi', state: 'QLD', expectedState: 'QLD', expectedBag: '5' }
];

let passed = 0;
tests.forEach(t => {
    const res = matchStateRule(t.species, t.state);
    if (!res) {
        console.error(`FAIL: ${t.species} in ${t.state} returned null`);
    } else if (res.stateCode !== t.expectedState) {
        console.error(`FAIL: ${t.species} in ${t.state} returned state ${res.stateCode}`);
    } else if (t.expectedBag && res.rule.bagLimit !== t.expectedBag) {
        console.error(`FAIL: ${t.species} in ${t.state} expected bag ${t.expectedBag} but got ${res.rule.bagLimit}`);
    } else {
        console.log(`PASS: ${t.species} in ${t.state} -> ${res.stateName} (${res.rule.name}, Bag: ${res.rule.bagLimit})`);
        passed++;
    }
});
console.log(`Passed ${passed} / ${tests.length} tests`);
