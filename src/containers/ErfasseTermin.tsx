import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { Avatar, Card, CardHeader } from '@material-ui/core'
import Kalender from './Kalender'

import { Draggable } from '@fullcalendar/interaction'
import './ErfasseTermin.css'
import { selectMieter } from '../state/selectors'
import { FuncWrapper, MieterDto } from '../model/model'
import { selectBackendSynced, selectMieter } from '../state/selectors'
import { MieterDto } from '../model/model'
import SyncIcon from '@material-ui/icons/Sync'
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled'

import avatar1 from './avatars/Hugo.jpg'
import avatar2 from './avatars/FamRamseier.jpg'
import avatar3 from './avatars/FrauBrönnimann.png'
import avatar4 from './avatars/BeatLisa.jpg'
import { green, red } from '@material-ui/core/colors'
import { selectAvatar } from '../utils/date-utils'

const ErfasseTermin: React.FC = () => {
    const containerElRef = useRef<HTMLDivElement>(null)
    const mieter = useSelector(selectMieter)

    useEffect(() => {
        if (containerElRef.current) {
            new Draggable(containerElRef.current, {
                itemSelector: '.draggable',
                eventData: (eventEl: HTMLElement) => {
                    return {
                        title: eventEl.innerText,
                        duration: { hours: 9 },
                        create: false,
                    }
                },
            })
        }
    }, [])

    return (
        <div className={'termin-erfassung'}>
            <div className={'anleitungContainer'}>
                <Card>
                    <CardHeader
                              style={{ backgroundColor: '#edcfb7' }}
                              title="ANLEITUNG: DU KANNST DEN AVATAR DES MIETERS IN DEN KALENDER SCHIEBEN UM
                              EINEN WASCHTAG ZU BUCHEN!"
                              avatar={<Avatar src="" />}
                    />
                </Card>
            </div>
            <div className={'mieterContainer'} ref={containerElRef}>
                {mieter?.mieter.map((mieter: MieterDto) => (
                    <div key={mieter.id} className={'mieter'}>
                        <Card>
                            <CardHeader
                                className={'draggable'}
                                draggable={'true'}
                                title={mieter.name}
                                variant={'outlined'}
                                avatar={<Avatar src={selectAvatar(mieter.name)} />}
                                itemProp={mieter.id}
                            />
                        </Card>
                        <div className="spaceBetweenIcons" />
                    </div>
                ))}
            </div>
            <div className={'calendarWrapper'}>
                <Kalender />
            </div>
        </div>
    )
}

export default ErfasseTermin
