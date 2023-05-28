import React from "react";
import '../css/style.css'

class HomePage extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="title">
                    <div className="site-description">
                        <h2>Будь в курсе цен<br/>с CS<i>Inventory</i></h2>
                        <p>Отслеживайте изменение цен на предметы в Counter-Strike<br/>и управляйте своим инвентарем
                            максимально эффективно.</p>
                    </div>
                    {/*<div class="imgs">
                        <img id="elipse" src="../assets/img/gr-elipse.svg" alt="">
                        <img id="guns" src="../assets/img/guns.svg" alt="">
                    </div>*/}

                    <form action="" className="url-form">
                        <input type="text" name="steam-url" className="url-input" id="" placeholder="Steam URL"/>
                        <input type="button" className="load-input" value="Загрузить инвентарь"/>
                    </form>
                </div>

                <div className="info">
                    <div className="steps">
                        <div className="step">Загружай свой инвентарь<br/>и узанай его рыночную стоимость</div>
                        <div className="step">Следи за динамикой изменения<br/> стоимости своих предметов</div>
                        <div className="step">Получай максимальную<br/> выгоду от продажи</div>
                    </div>
                    <div className="numbers">
                        <div className="number">1</div>
                        <div className="line"></div>
                        <div className="number">2</div>
                        <div className="line"></div>
                        <div className="number">3</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default HomePage;
