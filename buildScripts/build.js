/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue("Gerando pacotes minificados para produção. Aguarde um minuto..."));

webpack(webpackConfig).run((err, stats) => {
  if(err){
    console.log(chalk.red(err));

    return 1;
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors){
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if(jsonStats.hasWarnings){
    console.log(chalk.yellow('Webpack gerou os seguintes alertas: '))
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(chalk.green("O pacote do aplicativo para procução foi gerado e gravado na pasta /dist!"));

  console.log(`Webpack stats: ${stats}`);

  return 0;
})
