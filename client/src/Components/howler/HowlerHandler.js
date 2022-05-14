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

            if ( randEffect === lastEffect ) {
                randEffect = radioEffects[Math.floor(Math.random()*radioEffects.length)];
            }
            
            clearTimeout( radio )
            newTimeout = setTimeout(() => handleRadio(), randInterval );
            setRadio( newTimeout )
    
            const output = new Howl({
                src: [randEffect],
                volume: .1
            });
            lastEffect = randEffect
            return output.play();
        } else {
            clearTimeout( radio );
            setRadio( null );
            return Howler.unload();
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
        let themeInterval;

        if (isLoop) {
          clearTimeout( theme );
          themeInterval = setTimeout(() => createTheme(), 25000 );
          setTheme( themeInterval );
        } else {
          clearTimeout( theme );
          setTheme( null );
          Howler.unload();
        }
    }

    React.useEffect(() => {
        if ( isLoop ) {
            const ambient = new Howl({
                src: ambEffects,
                loop: true,
                volume: .2
            });
            handleTheme();
            handleRadio();
            ambient.play();
        } else {
            clearTimeout( theme )
            clearTimeout( radio )
            Howler.unload();
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

function radioHandler (srcArr, state, timeoutId) {
    let newTimeout, lastInput;
    if ( state ) {
      let input = srcArr[Math.floor(Math.random()*srcArr.length)];
      if ( input === lastInput ) {
        input = srcArr[Math.floor(Math.random()*srcArr.length)];
      }
      let interval = Math.round(Math.random() * (90000 - 10000) + 10000);
      clearTimeout( timeoutId );
      newTimeout = setTimeout(() => radioHandler(srcArr), interval );
      return ({ input: input, interval: Math.round(Math.random()*(90000 - 10000)+10000)})
    } else {
      clearTimeout( timeoutId );
      Howler.unload();
      return ({ state: null })
    }
  }


//   let lastInput;

//     function randInterval () { /* function handles random radio chatter and attempts to make sure that its not repetative */
//       let radioInterval;
      
//       if (state.isTheme) {        
//         let input = radioEffects[Math.floor(Math.random()*radioEffects.length)];        

//         if (input === lastInput){
//           input = radioEffects[Math.floor(Math.random()*radioEffects.length)];
//         }
        
//         let interval = Math.round(Math.random() * (90000 - 10000) + 10000);
        
//         clearTimeout(radioLoop);  
//         radioInterval = setTimeout( randInterval, interval );
//         setRadio( radioInterval );

//         const extra = new Howl({
//           src: [input],
//           volume: .1
//         });

//         lastInput = input;
//         extra.play();
//       } else { 
//         console.log(radioLoop, 'RADIO LOOPS')
//         clearTimeout( radioLoop );
//         setRadio( null );
//         Howler.unload();
//       } 
//     }