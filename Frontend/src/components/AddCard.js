import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/AddCard.css';

function AddCard({ path_title }) {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsImgURL, setNewsImgURL] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [articleImgURL, setArticleImgURL] = useState("");
    const [relevantTitle, setRelevantTitle] = useState("");
    const [relevantContent, setRelevantContent] = useState("");
    const [relevantImgURL, setRelevantImgURL] = useState("");
    const [articleURL, setArticleURL] = useState("");
    const [industryTitle, setIndustryTitle] = useState("");
    const [industryImgURL, setIndustryImgURL] = useState("");

    function addCard() {

        const formData = new FormData();
        formData.append('news_title', newsTitle);
        formData.append('news_content', newsContent);
        formData.append('news_Img_url', newsImgURL);
        formData.append('article_title', articleTitle);
        formData.append('article_content', articleContent);
        formData.append('article_Img_url', articleImgURL);
        formData.append('date_published', new Date().toLocaleDateString('en-US'));
        formData.append('relevant_title', relevantTitle);
        formData.append('relevant_content', relevantContent);
        formData.append('relevant_Img_url', relevantImgURL);
        formData.append('article_url', articleURL);
        formData.append('industry_title', industryTitle);
        formData.append('industry_Img_url', industryImgURL);

        fetch("http://unn-w20001556.newnumyspace.co.uk/kv6002/coursework/api/resources/" + path_title + "/add", {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('The data cannot be added');
                }
                alert('The card has been added successfully. Please go back to see the new card.');
            })
            .catch((error) => {
                console.error('Error reason:', error);
            });
    }

    function handleAdd() {

        if (path_title === "news-and-insights") {
            if (newsTitle === "" || newsContent === "" || newsImgURL === "" ||
                articleTitle === "" || articleContent === "" || articleImgURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
        else if (path_title === "relevant-news-stories") {
            if (relevantTitle === "" || relevantContent === "" || relevantImgURL === "" ||
                articleURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
        else if (path_title === "industry-reports") {
            if (industryTitle === "" || industryImgURL === "" || articleURL === "") {
                setShowConfirmation(false);
                alert("Please fill out all required fields.");
                return;
            } else {
                setShowConfirmation(true);
            }
        }
    }

    function handleConfirmation(value) {
        setShowConfirmation(false);
        if (value === 'yes') {
            addCard();
        }
    }

    function maxNewsTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setNewsTitle(inputValue);
        }
    }

    function maxNewsContentChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 140) {
            setNewsContent(inputValue);
        }
    }

    function maxArticleTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 110) {
            setArticleTitle(inputValue);
        }
    }

    function replaceSymbol(e) {
        const inputValue = e.target.value;
        const replacedValue = inputValue.replace(/\n/g, '\\n'); //Replace '\n' with '\\n'
        setArticleContent(replacedValue);
    }

    function maxRelevantTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setRelevantTitle(inputValue);
        }
    }

    function maxRelevantContentChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 140) {
            setRelevantContent(inputValue);
        }
    }

    function maxIndustryTitleChar(e) {
        const inputValue = e.target.value;
        if (inputValue.length < 65) {
            setIndustryTitle(inputValue);
        }
    }

    return (
        <div>
            {path_title === "news-and-insights" &&
                <div>
                    <Navbar />
                    <div className="addHero">
                        <img alt="AddCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/addCardHero.jpg" />
                    </div>
                    <div className="addTitle">
                        <h1>Insert a new card on the <span class="addPathTitle">News and Insights</span> page</h1>
                    </div>
                    <div className="insertForm">
                        <label>
                            Card Title <span className="required">* Required</span>
                            <input type="text" placeholder="No more than 65 characters"
                                onChange={(e) => maxNewsTitleChar(e)} maxLength={65} />
                        </label>
                        <label>
                            Card Content <span className="required">* Required</span>
                            <textarea name="cardContent" rows="2" placeholder="No more than 140 characters"
                                onChange={(e) => maxNewsContentChar(e)} maxLength={140} />
                        </label>
                        <label>
                            URL Address of Card Image <span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid image address"
                                onChange={(e) => setNewsImgURL(e.target.value)} />
                        </label>
                        <label>
                            Article Title <span className="required">* Required</span>
                            <input type="text" placeholder="No more than 110 characters"
                                onChange={(e) => maxArticleTitleChar(e)} maxLength={110} />
                        </label>
                        <label>
                            Article Content <span className="required">* Required</span>
                            <textarea name="articleContent" rows="10"
                                onChange={replaceSymbol} />
                        </label>
                        <label>
                            URL Address of Article Image<span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid image URL address"
                                onChange={(e) => setArticleImgURL(e.target.value)} />
                        </label>
                        <div className="btns">
                            <Link to="/resources/news-and-insights" className="link">
                                <button>Go Back</button>
                            </Link>
                            <button onClick={handleAdd}>Add Card</button>
                        </div>
                    </div>
                    {showConfirmation && (
                        <div className="addNotification">
                            <p>Are you sure you want to add the card?</p>
                            <div>
                                <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                <button onClick={() => handleConfirmation('no')}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            }
            {path_title === "relevant-news-stories" &&
                <div>
                    <Navbar />
                    <div className="addHero">
                        <img alt="AddCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/addCardHero.jpg" />
                    </div>
                    <div className="addTitle">
                        <h1>Insert a new card on the <span class="addPathTitle">Relevant News Stories</span> page</h1>
                    </div>
                    <div className="insertForm">
                        <label>
                            Card Title <span className="required">* Required</span>
                            <input type="text" placeholder="No more than 65 characters"
                                onChange={(e) => maxRelevantTitleChar(e)} maxLength={65} />
                        </label>
                        <label>
                            Card Content <span className="required">* Required</span>
                            <textarea name="cardContent" rows="2" placeholder="No more than 140 characters"
                                onChange={(e) => maxRelevantContentChar(e)} maxLength={140} />
                        </label>
                        <label>
                            URL Address of Card Image<span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid image URL address"
                                onChange={(e) => setRelevantImgURL(e.target.value)} />
                        </label>
                        <label>
                            URL Address of article<span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid article URL address"
                                onChange={(e) => setArticleURL(e.target.value)} />
                        </label>
                        <div className="btns">
                            <Link to="/resources/relevant-news-stories" className="link">
                                <button>Go Back</button>
                            </Link>
                            <button onClick={handleAdd}>Add Card</button>
                        </div>
                    </div>
                    {showConfirmation && (
                        <div className="addNotification">
                            <p>Are you sure you want to add the card?</p>
                            <div>
                                <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                <button onClick={() => handleConfirmation('no')}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            }
            {path_title === "industry-reports" &&
                <div>
                    <Navbar />
                    <div className="addHero">
                        <img alt="AddCardHeroImg" src="http://unn-w20001556.newnumyspace.co.uk/IC3_Images/Hero_Images/addCardHero.jpg" />
                    </div>
                    <div className="addTitle">
                        <h1>Insert a new card on the <span class="addPathTitle">Industry Reports</span> page</h1>
                    </div>
                    <div className="insertForm">
                        <label>
                            Card Title <span className="required">* Required</span>
                            <input type="text" placeholder="No more than 65 characters"
                                onChange={(e) => maxIndustryTitleChar(e)} maxLength={65} />
                        </label>
                        <label>
                            URL Address of Card Image<span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid image URL address"
                                onChange={(e) => setIndustryImgURL(e.target.value)} />
                        </label>
                        <label>
                            URL Address of partner's script <span className="required">* Required</span>
                            <input type="text" placeholder="Please insert a valid URL address"
                                onChange={(e) => setArticleURL(e.target.value)} />
                        </label>
                        <div className="btns">
                            <Link to="/resources/industry-reports" className="link">
                                <button>Go Back</button>
                            </Link>
                            <button onClick={handleAdd}>Add Card</button>
                        </div>
                    </div>
                    {showConfirmation && (
                        <div className="addNotification">
                            <p>Are you sure you want to add the card?</p>
                            <div>
                                <button onClick={() => handleConfirmation('yes')}>Yes</button>
                                <button onClick={() => handleConfirmation('no')}>No</button>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );

}

export default AddCard;
