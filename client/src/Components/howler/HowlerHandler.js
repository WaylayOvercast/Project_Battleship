import React from 'react';
import { Howl, Howler } from 'howler';
import { ambEffects, radioEffects, themeEffects } from '../../audio/audioHandler';


export function useTheme () {
    const [radio, setRadio] = React.useState(null);
    const [theme, setTheme] = React.useState(null);
    const [isLoop, setLoop] = React.useState(null);
    let newTimeout, lastEffect;

    function handleRadio () {
    
        if ( isLoop ) {
            
                let randEffect = radioEffects[Math.floor(Math.random()*radioEffects.length)];
                let randInterval = Math.round(Math.random() * (90000 - 10000) + 10000);
                // select random effect and interval
    
                if ( randEffect === lastEffect ) {
                    randEffect = radioEffects[Math.floor(Math.random()*radioEffects.length)];
                    // make sure it wasnt last played
                }
        
                clearTimeout( radio );
                newTimeout = setTimeout( handleRadio, randInterval ); 
                setRadio( newTimeout );
                // set recursive timeout and save to state for cancelation
        
                const output = new Howl({
                    src: [randEffect],
                    volume: .1
                });
                
                lastEffect = randEffect;
                 
                output.play()
                // play effect 
        } else {
            clearTimeout( radio );
            setRadio( null );
            Howler.unload();
        }
    }

    function createTheme () {
        const theme = new Howl({
          src: themeEffects,
          volume: .2,
          loop: true
        });
        return theme.play();
    }
    
    function handleTheme () {

        clearTimeout( theme );
        let themeInterval = setTimeout(() => createTheme(), 25000 );
        setTheme( themeInterval ); 
        // store timeout refrence in state in order to cancel it before it runs
    }

    React.useEffect(() => {
        if ( isLoop ) {
            const ambient = new Howl({ 
                src: ambEffects,
                loop: true,
                volume: .2
            });
            ambient.play();
            // create ambient track and play first.

            handleTheme();
            newTimeout = setTimeout(() => { 
                handleRadio();
            }, 27000); 
            setRadio( newTimeout );
            // start radio calls right after the theme.

        } else {
            clearTimeout( theme ); 
            clearTimeout( radio );
            Howler.unload();
            // wipe timeouts from stack and unload audio if audio is toggled
        }
    },[isLoop])
    
    return [setLoop]
}


export function FXhandler (src, volume, loop) { 
    
    if  (!volume && !loop) {
        
        const effect = new Howl({        //  general purpose audio handler for //
            src                         // sound effects and click events    //
        })
        return effect.play()

    } else if (!loop) {
        
        const effect = new Howl({
            src: src,
            volume: volume
        })
        return effect.play()

    } else if (!volume) {
        
        const effect = new Howl({
            src: src,
            loop: loop
        })
        return effect.play()
    }   
}
