import React from 'react'
import { Bracket, RoundProps } from 'react-brackets';

function Tournament() {
    const rounds= [
        {
          title: 'Round one',
          seeds: [
            {
              id: 1,
            //   date: new Date().toDateString(),
              teams: [{ name: 'Novak Djokovic' }, { name: 'Daniil Medvedev' }],
            },
            {
              id: 2,
            //   date: new Date().toDateString(),
              teams: [{ name: 'Rafael Nadal' }, { name: 'Roger Federer' }],
            },
          ],
        },
        {
          title: 'Round two',
          seeds: [
            {
              id: 3,
            //   date: new Date().toDateString(),
              teams: [{ name: 'Roger Federer' }, { name: 'Novak Djokovic' }],
            },
          ],
        },
      ];
    return (
        <div>
            <Bracket rounds={rounds} />
        </div>
    )
}

export default Tournament
