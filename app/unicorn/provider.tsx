import {useUserAccountStore} from '@/lib/states'
import {useTheme} from 'next-themes'
import {useEffect} from 'react'
import materialDynamicColors from 'material-dynamic-colors'
import {setStyle} from '@/app/unicorn/index'

export default function UnicornEngine({ children }: {
    children?: React.ReactNode
}): JSX.Element {
    const {user, setUser} = useUserAccountStore()
    const {theme} = useTheme()

    // useEffect(() => {
    //     if (user) {
    //         if (!user.theme) {
    //             // @ts-ignore
    //             materialDynamicColors(user.banner).then(colors => {
    //                 console.log(colors)
    //                 setStyle(colors)
    //
    //                 // save to user
    //                 setUser({
    //                     ...user,
    //                     theme: colors,
    //                 })
    //             })
    //         } else {
    //             setStyle(user.theme)
    //         }
    //
    //         // Change UnicornBackground img to user banner, cover fixed
    //         // document.getElementById('UnicornBackground')!.style.background = `url(${user.banner}) no-repeat center center / cover`
    //     }
    // }, [theme, user])

    return (
        <>
            {children}
        </>
    )
}