import { webpack} from 'webpack'
import config from './webpack.config'
webpack(config, (...res) => {
    console.log(...res)
})