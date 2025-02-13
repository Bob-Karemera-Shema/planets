const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePLanets = [];

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (planet) => {
        if(isHabitablePlanet(planet)) habitablePLanets.push(planet);
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePLanets.map((planet) => planet['kepler_name']));
        console.log(`${habitablePLanets.length} habitable planets found!`);
    });