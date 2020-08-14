import { act } from 'react-dom/test-utils'

const actImmediate = (wrapper) =>
    act(
        () =>
            new Promise((resolve) => {
                setImmediate(() => {
                    wrapper.update()
                    resolve()
                })
            })
    )

export default actImmediate
