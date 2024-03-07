import inquirer from 'inquirer';
import chalk from 'chalk';
class AdventureGame {
    Health = 100;
    maxDamage = 50;
    EnemyDamage = 50;
    Healthpotion = 3;
    maxEnemyHealth = 75;
    HealthpotionHealupto = 30;
    HealthpotionDropupto = 50;
    sleep = () => new Promise((r) => { setTimeout(r, 2000); });
    enemyList = ['Warrior', 'Zombie', 'Assasian ', 'Skeleton'];
    async mainloop() {
        let running = true;
        let isRunAway = false;
        while (running) {
            let enemy = this.enemyList[Math.floor(Math.random() * this.enemyList.length)];
            let enemyHealth = Math.floor(Math.random() * this.maxEnemyHealth);
            await this.sleep();
            console.log(chalk.cyan(`     ***** ${enemy.trim()} appeared *****  `));
            while (enemyHealth > 0) {
                console.log(chalk.yellow(`   Your Health = ${this.Health}   `));
                console.log(chalk.yellow(`   ${enemy.trim()}'s Health  = ${enemyHealth}   `));
                const { choice } = await inquirer.prompt([
                    {
                        name: 'choice',
                        type: 'rawlist',
                        message: chalk.green('Take any action'),
                        choices: ["Attack", 'Drink Healthpotion', 'Runaway'],
                    },
                ]);
                if (choice === "Attack") {
                    let DamageTaken = Math.floor(Math.random() * this.maxDamage);
                    let DamageDealt = Math.floor(Math.random() * this.EnemyDamage);
                    this.Health -= DamageTaken;
                    enemyHealth -= DamageDealt;
                    await this.sleep();
                    console.log(`   *** You strike ${enemy.trim()} for   ${chalk.cyan(DamageDealt)} damage. ***   `);
                    console.log(`   *** ${enemy.trim()} damaged your Health upto ${chalk.cyan(DamageTaken)}. ***   `);
                    if (this.Health < 1) {
                        break;
                    }
                }
                else if (choice === "Drink Healthpotion") {
                    if (this.Healthpotion > 0) {
                        await this.sleep();
                        this.Healthpotion--;
                        this.Health += this.HealthpotionHealupto;
                        console.log(`You drank potion healing yourself for ${chalk.blue(this.HealthpotionHealupto)}  you have ${chalk.blue(this.Health)}`);
                        console.log(`You are left with ${chalk.blue(this.Healthpotion)} Healthpotion.`);
                    }
                    else {
                        await this.sleep();
                        console.log(`You are left with ${chalk.cyan(this.Healthpotion)}.Defeat enemy to get  a chance Healthpotion`);
                    }
                }
                else {
                    await this.sleep();
                    console.log(`    ***** You run away from ${chalk.cyan(enemy.trim())} *****   `);
                    isRunAway = true;
                    break;
                }
            }
            if (isRunAway) {
                isRunAway = false;
                continue;
            }
            if (this.Health < 1 && enemyHealth < 1) {
                await this.sleep();
                console.log(`     *** ${chalk.bold.italic(enemy.trim())} dropped  BOMB. You  Both got KILLED ***    `);
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                break;
            }
            if (this.Health < 1) {
                await this.sleep();
                console.log(`      *** You are defeated by  ${chalk.cyan(enemy.trim())} ***   `);
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                break;
            }
            await this.sleep();
            console.log(chalk.green(`      ** ${enemy.trim()} got DEFEATED .You WON. **    `));
            console.log(`      You are left with ${chalk.green(this.Health)}.     `);
            if (Math.ceil(Math.random() * 100) < this.HealthpotionDropupto) {
                this.Healthpotion++;
                console.log(`    ${enemy.trim()} dropped a Health potion.Now ,You have ${this.Healthpotion}    `);
            }
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            {
                const { choice } = await inquirer.prompt([
                    {
                        name: 'choice',
                        message: chalk.blue('Take any action:'),
                        type: 'list',
                        choices: ['Continue fighting', 'exit']
                    }
                ]);
                if (choice === 'Continue fighting') {
                    continue;
                }
                break;
            }
        }
        console.log(chalk.cyan('          Thanks for playing!!!!!!      '));
        console.log(chalk.cyan('========================================='));
    }
    startgame() {
        console.log(chalk.blue(`          *** Instruction!!!! ***      `));
        console.log(`   =) You can damage enemy UPTO ${this.maxDamage} Health   `);
        console.log(`    =) Enemy can damage you UPTO ${this.EnemyDamage} Health    `);
        this.mainloop();
    }
}
const newgame = new AdventureGame();
newgame.startgame();
