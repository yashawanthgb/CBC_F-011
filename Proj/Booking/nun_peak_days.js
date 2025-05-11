// Nun Peak 30-day itinerary
// Nun Peak 30-day itinerary
const nunPeakDays = [
    'Day 1: Arrival at Leh, acclimatization and briefing.',
    'Day 2: Leh local sightseeing and acclimatization.',
    'Day 3: Drive from Leh to Kargil.',
    'Day 4: Drive to Tangol (base village).',
    'Day 5: Trek from Tangol to Base Camp.',
    'Day 6: Acclimatization and load ferry to Camp 1.',
    'Day 7: Rest day at Base Camp.',
    'Day 8: Climb to Camp 1, set up camp.',
    'Day 9: Load ferry to Camp 2, return to Camp 1.',
    'Day 10: Move to Camp 2.',
    'Day 11: Load ferry to Camp 3, return to Camp 2.',
    'Day 12: Rest day at Camp 2.',
    'Day 13: Move to Camp 3.',
    'Day 14: Summit preparation and rest.',
    'Day 15: Summit attempt and return to Camp 3.',
    'Day 16: Contingency day.',
    'Day 17: Descend to Camp 2.',
    'Day 18: Descend to Base Camp.',
    'Day 19: Rest and celebration at Base Camp.',
    'Day 20: Trek back to Tangol.',
    'Day 21: Drive back to Kargil.',
    'Day 22: Drive to Leh.',
    'Day 23: Rest day in Leh.',
    'Day 24: Explore monasteries around Leh.',
    'Day 25: Optional rafting in Zanskar.',
    'Day 26: Local cultural immersion in Leh.',
    'Day 27: Trek wrap-up and gear checks.',
    'Day 28: Buffer day.',
    'Day 29: Final exploration of Leh bazaar.',
    'Day 30: Departure from Leh.'
];

// Kun Peak 30-day itinerary
const kunPeakDays = [
    'Day 1: Arrival at Leh, altitude acclimatization.',
    'Day 2: Sightseeing and gear check in Leh.',
    'Day 3: Drive to Kargil via Lamayuru.',
    'Day 4: Travel to Parkachik, the approach village.',
    'Day 5: Trek to Base Camp, gear setup.',
    'Day 6: Load ferry and acclimatization hike.',
    'Day 7: Training and rest at Base Camp.',
    'Day 8: Move to Camp 1.',
    'Day 9: Load ferry to Camp 2, return to Camp 1.',
    'Day 10: Move to Camp 2.',
    'Day 11: Rest and acclimatize at Camp 2.',
    'Day 12: Move to Camp 3.',
    'Day 13: Load ferry and route fixing.',
    'Day 14: Summit prep and team briefing.',
    'Day 15: Summit attempt, return to Camp 3.',
    'Day 16: Extra day for weather.',
    'Day 17: Return to Camp 2.',
    'Day 18: Return to Base Camp.',
    'Day 19: Buffer and celebration day.',
    'Day 20: Trek back to Parkachik.',
    'Day 21: Drive to Kargil.',
    'Day 22: Rest day in Kargil.',
    'Day 23: Drive to Leh.',
    'Day 24: Monastery circuit tour.',
    'Day 25: River rafting in Indus.',
    'Day 26: Local Leh exploration.',
    'Day 27: Trek debrief and recovery.',
    'Day 28: Spare summit day if required.',
    'Day 29: Leisure day in Leh.',
    'Day 30: Departure from Leh.'
];

// Saltoro Kangri 30-day itinerary
const saltoroKangriDays = [
    'Day 1: Arrival at Leh, acclimatization.',
    'Day 2: Permit processing and gear check.',
    'Day 3: Fly to Siachen Base Camp.',
    'Day 4: Rest and training at base camp.',
    'Day 5: Move to Glacier Camp.',
    'Day 6: Trek to Base Camp.',
    'Day 7: Load ferry and acclimatization trek.',
    'Day 8: Camp 1 setup.',
    'Day 9: Rest at Camp 1.',
    'Day 10: Climb to Camp 2.',
    'Day 11: Load ferry to Camp 3, return to Camp 2.',
    'Day 12: Move to Camp 3.',
    'Day 13: Rest and recce summit route.',
    'Day 14: Summit push preparations.',
    'Day 15: Summit attempt.',
    'Day 16: Emergency/Buffer day.',
    'Day 17: Descent to Camp 2.',
    'Day 18: Descent to Camp 1.',
    'Day 19: Return to Base Camp.',
    'Day 20: Trek back to Glacier Camp.',
    'Day 21: Return to Siachen Base.',
    'Day 22: Fly back to Leh.',
    'Day 23: Rest and debrief.',
    'Day 24: Visit Pangong Lake.',
    'Day 25: Cultural evening in Leh.',
    'Day 26: Leisure and shopping in Leh.',
    'Day 27: Contingency day.',
    'Day 28: Free day.',
    'Day 29: Final check-out and gear return.',
    'Day 30: Fly out from Leh.'
];

// Export for use in other files
if (typeof module !== 'undefined') {
    module.exports = { nunPeakDays, kunPeakDays, saltoroKangriDays };
} else {
    window.nunPeakDays = nunPeakDays;
    window.kunPeakDays = kunPeakDays;
    window.saltoroKangriDays = saltoroKangriDays;
}
