import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { apiRoot } from './siteroot';

function Expense(props: any){
    const [expense, setExpense] = useState(props.data);
    const [isEdit, setIsEdit] = useState(false);
    const [type, setType] = useState(expense.type);
    const [value, setValue] = useState(expense.value);
    useEffect( () => {
        setExpense(props.data);
    }, [props.data] )
    const setComplete = () => {
        fetch(apiRoot + 'changeExpenseStatus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: expense.id
            })
        })
        .then(() => props.shouldReload(true));
    }
    function deleteexpense(){
        fetch (apiRoot + 'deleteExpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: expense.id})
        })
        .then( () => props.shouldReload(true) );
    }
    function changeEditState(){
        setIsEdit(!isEdit);
    }
    function update(){
        changeEditState();
        fetch (apiRoot + 'updateExpense', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: expense.id,
                type: type,
                value: value,
            })
        })
        .then( response => response.json())
        .then( response => setExpense(response));
    }
    let enable = ' darken';
    let background = '';
    let checkmark = '';
    if (expense.isComplete) {
        enable = ' enable';
        background = ' bg-green';
        checkmark = 'checkmark'
    }
    let typeField = expense.type;
    let valueField = expense.value;
    let actionOne = <svg 
                        onClick={changeEditState}
                        className="hover"
                        width="17" 
                        height="17" 
                        viewBox="0 0 17 17" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle 
                            cx="8.5" 
                            cy="8.5" 
                            r="8.5" 
                            fill="#FCF5C7"
                        />
                        <path 
                            d="M5.01754 12.9722C4.57048 12.8729 4.2431 12.5859 4.07419 12.1451C3.98093 11.9018 3.97287 5.37187 4.06554 5.13045C4.24496 4.663 4.58335 4.36773 5.04026 4.27993C5.32338 4.22553 8.42489 4.24003 8.53075 4.29625C8.71639 4.39485 8.73997 4.6265 8.57968 4.77695C8.5279 4.82556 8.5279 4.82556 6.8308 4.83528C4.90034 4.84633 5.02331 4.83491 4.81581 5.02228C4.57397 5.24067 4.59167 4.95602 4.59167 8.62599C4.59167 12.3083 4.57418 12.0041 4.79805 12.2144C5.02284 12.4256 4.68486 12.407 8.42453 12.4136C12.2413 12.4202 11.9703 12.435 12.2036 12.2079C12.4015 12.0154 12.3916 12.1101 12.4026 10.2984C12.412 8.72923 12.4131 8.69298 12.4516 8.62708C12.5608 8.4405 12.8337 8.43718 12.9476 8.62107C13.0104 8.72262 13.0201 11.7764 12.9583 12.019C12.8475 12.454 12.5144 12.8065 12.0735 12.9551C11.933 13.0025 5.22699 13.0188 5.01754 12.9722V12.9722ZM5.96512 11.1459C5.93265 11.1317 5.88291 11.0924 5.85458 11.0586C5.7488 10.9323 5.74769 10.938 6.0708 9.96365C6.36556 9.07484 6.36556 9.07484 8.8561 6.57109C10.2259 5.19402 11.3686 4.05208 11.3955 4.03344C11.4556 3.99173 11.6097 3.98836 11.6825 4.02717C11.7454 4.06075 12.8734 5.19638 12.9038 5.25685C12.9338 5.31637 12.9305 5.44943 12.8974 5.51184C12.8649 5.57337 7.90099 10.5573 7.84379 10.5859C7.76438 10.6256 6.10343 11.1732 6.06459 11.1725C6.04235 11.172 5.99759 11.1601 5.96512 11.1459L5.96512 11.1459ZM9.34111 8.2792C11.1288 6.48209 11.1288 6.48208 10.7881 6.1399C10.4474 5.79772 10.4474 5.79772 8.66564 7.58716C6.88392 9.37659 6.88392 9.37659 6.74901 9.7743C6.5047 10.4945 6.46672 10.4349 7.04792 10.2431C7.55342 10.0763 7.55342 10.0763 9.34111 8.2792ZM11.8763 5.72867C12.0593 5.54638 12.209 5.391 12.209 5.38337C12.209 5.37574 12.0586 5.21868 11.8749 5.03434C11.5407 4.69918 11.5407 4.69918 11.2024 5.03941C10.864 5.37964 10.864 5.37964 11.2024 5.71987C11.3885 5.907 11.5414 6.0601 11.5422 6.0601C11.543 6.0601 11.6934 5.91096 11.8763 5.72867V5.72867Z" 
                            fill="black"
                        />
                    </svg>;
    let actionTwo = <svg
                        className="hover"
                        onClick={deleteexpense} 
                        width="17" 
                        height="17" 
                        viewBox="0 0 17 17" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle 
                            cx="8.5" 
                            cy="8.5" 
                            r="8" 
                            fill="white"
                        />
                        <path 
                            d="M8.06753 16.9885C5.48718 16.8505 3.13085 15.5691 1.6114 13.4778C0.466307 11.9017 -0.105547 9.93317 0.016081 7.98621C0.181902 5.33182 1.53944 2.95378 3.74675 1.45105C6.23157 -0.240606 9.51888 -0.471642 12.2234 0.855292C13.0726 1.27188 13.7623 1.75904 14.4335 2.4162C14.8386 2.81283 15.1361 3.15842 15.4346 3.57909C16.74 5.41865 17.2542 7.67045 16.8818 9.91627C16.4982 12.2292 15.1458 14.2997 13.166 15.6051C11.6768 16.587 9.84642 17.0836 8.06753 16.9885ZM10.9394 13.3167C11.3389 13.2002 11.6371 12.908 11.7577 12.5148C11.7882 12.4154 11.7896 12.2755 11.7896 9.45236C11.7896 6.75131 11.7871 6.48536 11.7609 6.39427L11.7322 6.2945L12.1687 6.2944C12.4197 6.29434 12.6331 6.28657 12.6708 6.2761C12.8175 6.23534 12.9317 6.07645 12.9318 5.91277C12.9318 5.76536 12.861 5.64936 12.7267 5.57708C12.6589 5.54059 12.6385 5.53962 11.846 5.53474L11.0348 5.52977V5.08207C11.0348 4.57229 11.0181 4.46693 10.9018 4.24189C10.8068 4.05805 10.6005 3.85781 10.409 3.76339C10.1517 3.63658 10.2152 3.64042 8.37987 3.64042C6.54648 3.64042 6.61445 3.63632 6.35283 3.76294C6.1431 3.86444 5.94958 4.05794 5.84807 4.26765C5.73957 4.49178 5.72559 4.58567 5.72524 5.09231L5.72492 5.52977L4.91368 5.53475L4.10246 5.53974L4.01964 5.58841C3.90625 5.65506 3.8461 5.75031 3.83687 5.87781C3.82798 6.00066 3.85448 6.08681 3.92628 6.16858C4.03051 6.28728 4.06376 6.29369 4.57717 6.29412C5.00567 6.29444 5.03377 6.29642 5.02251 6.32487C4.96302 6.4752 4.96201 6.52683 4.96171 9.44008C4.96138 12.6358 4.95391 12.4381 5.08521 12.7114C5.1668 12.8813 5.35191 13.0874 5.50656 13.1807C5.63092 13.2557 5.79907 13.3166 5.93723 13.3367C5.9993 13.3457 7.07334 13.3513 8.44058 13.3498C10.665 13.3473 10.8426 13.345 10.9394 13.3167ZM6.63595 12.5672C6.47047 12.5307 6.34534 12.4768 6.21717 12.3868C6.00934 12.2408 5.86259 12.0449 5.78115 11.8048L5.73362 11.6646V9.44369V7.22277L5.78115 7.08261C5.89773 6.73884 6.16869 6.4673 6.51076 6.35145L6.6533 6.30318L8.31914 6.29824C10.1934 6.29269 10.1399 6.28959 10.4091 6.41913C10.6997 6.55889 10.9422 6.8699 11.0088 7.18807C11.0468 7.36965 11.0468 11.5177 11.0088 11.6993C10.9423 12.017 10.703 12.3237 10.4101 12.4668C10.145 12.5962 10.1974 12.593 8.36759 12.5915C7.08576 12.5904 6.71795 12.5852 6.63595 12.5672ZM7.00524 11.8025C7.0866 11.7685 7.15889 11.7004 7.20149 11.6176C7.23354 11.5553 7.23461 11.4854 7.23461 9.44369C7.23461 7.40197 7.23354 7.3321 7.20149 7.2698C7.13285 7.13637 7.00837 7.05773 6.86673 7.05832C6.70837 7.05895 6.57427 7.14637 6.5154 7.28728C6.49154 7.34439 6.48845 7.59173 6.48845 9.44369C6.48845 11.7345 6.48252 11.6008 6.58915 11.7145C6.68922 11.8212 6.86926 11.8593 7.00524 11.8025ZM8.59169 11.7681C8.64022 11.7344 8.68282 11.6836 8.71391 11.6223L8.76163 11.5282V9.44369V7.35913L8.71391 7.26503C8.68265 7.2034 8.64023 7.15294 8.59094 7.11878C8.52314 7.07177 8.50243 7.06662 8.38145 7.06662C8.26431 7.06662 8.23808 7.07265 8.17567 7.11394C8.13634 7.13997 8.08224 7.19853 8.05547 7.24407L8.00679 7.32688L8.00217 9.40611C7.99915 10.77 8.00361 11.5078 8.01514 11.5506C8.04107 11.6469 8.12295 11.7494 8.2088 11.7929C8.32104 11.8499 8.48943 11.839 8.59169 11.7681ZM10.0419 11.8025C10.1233 11.7685 10.1956 11.7004 10.2382 11.6176C10.2702 11.5553 10.2713 11.4854 10.2713 9.44369C10.2713 7.40197 10.2702 7.3321 10.2382 7.2698C10.1685 7.13438 10.0426 7.05794 9.88923 7.05794C9.75111 7.05794 9.62606 7.13798 9.55825 7.2698C9.5262 7.3321 9.52514 7.40197 9.52514 9.44369C9.52514 11.4854 9.5262 11.5553 9.55825 11.6176C9.65041 11.7967 9.86203 11.8776 10.0419 11.8025ZM6.70536 5.11645C6.41149 4.98041 6.41921 4.55492 6.71781 4.4302C6.77456 4.4065 6.97569 4.40326 8.38868 4.40326C9.94454 4.40326 9.99711 4.40432 10.0611 4.43694C10.1342 4.47427 10.2301 4.57489 10.2551 4.64055C10.2829 4.71353 10.2741 4.86773 10.2382 4.93749C10.1994 5.0128 10.129 5.08196 10.0509 5.12134C10.001 5.14652 9.83305 5.1493 8.38507 5.14896C6.85469 5.14865 6.77132 5.14699 6.70536 5.11645Z" 
                            fill="#A50104"
                        />
                    </svg>;
    if (isEdit){
        typeField = <input className="input-small" type="text" placeholder={expense.type} onChange={(e)=>setType(e.target.value)} />;
        valueField = <input className="input-small" type="text" placeholder={expense.value} onChange={(e)=>setValue(e.target.value)} />;
        actionOne = <svg 
                        onClick={update}
                        className="hover"
                        width="17" 
                        height="17" 
                        viewBox="0 0 17 17" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M8.06964 16.9883C5.47057 16.8494 3.11071 15.5586 1.58464 13.4411C-0.0806746 11.1304 -0.463012 8.07897 0.578366 5.4101C1.2577 3.66909 2.51651 2.17931 4.12883 1.20819C5.75268 0.230124 7.68356 -0.173036 9.58868 0.0681901C11.7657 0.343845 13.7585 1.46268 15.1405 3.18519C16.0496 4.31829 16.6525 5.66208 16.8879 7.08026C16.9788 7.62745 16.999 7.88026 16.9999 8.48104C17.0009 9.03519 16.9879 9.23906 16.9222 9.70421C16.7343 11.0348 16.2243 12.3126 15.4401 13.4171C14.9427 14.1178 14.2957 14.7806 13.5989 15.3036C12.0225 16.4867 10.032 17.0932 8.06964 16.9883ZM7.5109 11.9939C7.57496 11.9794 7.66429 11.9462 7.70941 11.9202C7.80685 11.8641 13.3189 6.38641 13.4401 6.22527C13.6298 5.97316 13.6583 5.662 13.517 5.38537C13.4622 5.27794 13.3017 5.12116 13.189 5.06485C12.9753 4.95814 12.7423 4.95506 12.5105 5.05589C12.4069 5.10093 12.2656 5.23866 9.87092 7.62906L7.34077 10.1546L5.99087 8.80827C4.67456 7.49541 4.63757 7.46025 4.50486 7.39552C4.38564 7.33736 4.34974 7.32822 4.21531 7.3218C4.09349 7.31597 4.03697 7.32202 3.94119 7.3511C3.45543 7.49855 3.24812 8.08303 3.53118 8.50707C3.56303 8.55478 4.32965 9.33282 5.23477 10.236C6.97736 11.975 6.93272 11.9341 7.15413 11.9937C7.27425 12.026 7.36954 12.0261 7.5109 11.9939V11.9939Z" 
                            fill="#FCF5C7"
                        />
                    </svg>
        actionTwo = <svg 
                        onClick={changeEditState}
                        className="hover"
                        width="17" 
                        height="17" 
                        viewBox="0 0 17 17" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="8.5" cy="8.5" r="8.5" fill="#0E0F19"/>
                        <circle cx="8.5" cy="8.5" r="8.5" fill="white"/>
                        <path 
                            d="M7.74506 16.9537C6.35698 16.835 4.9834 16.3412 3.72036 15.5069C2.95979 15.0044 1.98654 14.0321 1.48367 13.2722C-0.492999 10.2853 -0.494647 6.69439 1.47928 3.72108C1.98797 2.95486 2.95833 1.98537 3.72524 1.47714C6.69727 -0.492381 10.308 -0.492381 13.2801 1.47714C14.0466 1.98512 15.0185 2.95595 15.5216 3.71621C15.9571 4.37415 16.2961 5.04288 16.5198 5.685C17.6013 8.78921 16.8235 12.2101 14.5145 14.5051C13.0605 15.9502 11.2227 16.794 9.17061 16.9586C8.47153 17.0146 8.45603 17.0146 7.74507 16.9537H7.74506ZM5.54332 12.3032C5.64705 12.2807 6.07166 11.8876 7.11767 10.8456L8.54999 9.41876L9.95864 10.8195C10.7334 11.5899 11.4164 12.2454 11.4763 12.2762C11.7562 12.4196 12.1742 12.2995 12.3399 12.0281C12.4542 11.8408 12.4618 11.4923 12.3552 11.3313C12.3126 11.267 11.6576 10.5917 10.8995 9.83061L9.52127 8.44688L10.9246 7.0395C11.6965 6.26545 12.3516 5.58563 12.3803 5.5288C12.5181 5.2567 12.3922 4.80935 12.1294 4.63732C11.9912 4.54683 11.6373 4.53529 11.4781 4.61607C11.4172 4.647 10.7337 5.30292 9.95937 6.07369L8.55144 7.47508L7.09473 6.02506C5.80572 4.74196 5.61895 4.57321 5.4723 4.55923C4.91922 4.50648 4.54199 4.90011 4.67221 5.3941C4.71469 5.55527 4.94365 5.80655 6.14988 7.01585L7.57727 8.44688L6.14988 9.87791C4.94365 11.0872 4.71469 11.3385 4.67221 11.4997C4.60762 11.7447 4.67113 11.9831 4.84462 12.1476C4.96721 12.2638 5.24843 12.3734 5.35393 12.3462C5.37997 12.3395 5.4652 12.3201 5.54332 12.3032H5.54332Z" 
                            fill="#A50104"
                        />
                    </svg>
    }
    /*
    if (isEdit){
        return <tr className="flex row center-row center-column size-12">
                    <td className="checkbox-cell right-text flex center-column center-row">
                        <div className={"checkbox"+background} onClick={setComplete}>
                            <div className={checkmark} />
                        </div>
                    </td>
                    <td className={"flex row center-row center-column"+enable}><input className="input-small" type="text" placeholder={expense.type} onChange={(e)=>setType(e.target.value)} /></td>
                    <td className={"flex row center-row center-column"+enable}><input className="input-small" type="text" placeholder={expense.value} onChange={(e)=>setValue(e.target.value)} /></td>
                    <td className="flex row center-row center-column">
                        <div className="flex center-column center-row margin-around">
                            <svg 
                                onClick={update}
                                className="hover"
                                width="17" 
                                height="17" 
                                viewBox="0 0 17 17" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M8.06964 16.9883C5.47057 16.8494 3.11071 15.5586 1.58464 13.4411C-0.0806746 11.1304 -0.463012 8.07897 0.578366 5.4101C1.2577 3.66909 2.51651 2.17931 4.12883 1.20819C5.75268 0.230124 7.68356 -0.173036 9.58868 0.0681901C11.7657 0.343845 13.7585 1.46268 15.1405 3.18519C16.0496 4.31829 16.6525 5.66208 16.8879 7.08026C16.9788 7.62745 16.999 7.88026 16.9999 8.48104C17.0009 9.03519 16.9879 9.23906 16.9222 9.70421C16.7343 11.0348 16.2243 12.3126 15.4401 13.4171C14.9427 14.1178 14.2957 14.7806 13.5989 15.3036C12.0225 16.4867 10.032 17.0932 8.06964 16.9883ZM7.5109 11.9939C7.57496 11.9794 7.66429 11.9462 7.70941 11.9202C7.80685 11.8641 13.3189 6.38641 13.4401 6.22527C13.6298 5.97316 13.6583 5.662 13.517 5.38537C13.4622 5.27794 13.3017 5.12116 13.189 5.06485C12.9753 4.95814 12.7423 4.95506 12.5105 5.05589C12.4069 5.10093 12.2656 5.23866 9.87092 7.62906L7.34077 10.1546L5.99087 8.80827C4.67456 7.49541 4.63757 7.46025 4.50486 7.39552C4.38564 7.33736 4.34974 7.32822 4.21531 7.3218C4.09349 7.31597 4.03697 7.32202 3.94119 7.3511C3.45543 7.49855 3.24812 8.08303 3.53118 8.50707C3.56303 8.55478 4.32965 9.33282 5.23477 10.236C6.97736 11.975 6.93272 11.9341 7.15413 11.9937C7.27425 12.026 7.36954 12.0261 7.5109 11.9939V11.9939Z" 
                                    fill="#FCF5C7"
                                />
                            </svg>
                        </div>
                        <div className="flex center-column center-row margin-around">
                            <svg 
                                onClick={changeEditState}
                                className="hover"
                                width="17" 
                                height="17" 
                                viewBox="0 0 17 17" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="8.5" cy="8.5" r="8.5" fill="#0E0F19"/>
                                <circle cx="8.5" cy="8.5" r="8.5" fill="white"/>
                                <path 
                                    d="M7.74506 16.9537C6.35698 16.835 4.9834 16.3412 3.72036 15.5069C2.95979 15.0044 1.98654 14.0321 1.48367 13.2722C-0.492999 10.2853 -0.494647 6.69439 1.47928 3.72108C1.98797 2.95486 2.95833 1.98537 3.72524 1.47714C6.69727 -0.492381 10.308 -0.492381 13.2801 1.47714C14.0466 1.98512 15.0185 2.95595 15.5216 3.71621C15.9571 4.37415 16.2961 5.04288 16.5198 5.685C17.6013 8.78921 16.8235 12.2101 14.5145 14.5051C13.0605 15.9502 11.2227 16.794 9.17061 16.9586C8.47153 17.0146 8.45603 17.0146 7.74507 16.9537H7.74506ZM5.54332 12.3032C5.64705 12.2807 6.07166 11.8876 7.11767 10.8456L8.54999 9.41876L9.95864 10.8195C10.7334 11.5899 11.4164 12.2454 11.4763 12.2762C11.7562 12.4196 12.1742 12.2995 12.3399 12.0281C12.4542 11.8408 12.4618 11.4923 12.3552 11.3313C12.3126 11.267 11.6576 10.5917 10.8995 9.83061L9.52127 8.44688L10.9246 7.0395C11.6965 6.26545 12.3516 5.58563 12.3803 5.5288C12.5181 5.2567 12.3922 4.80935 12.1294 4.63732C11.9912 4.54683 11.6373 4.53529 11.4781 4.61607C11.4172 4.647 10.7337 5.30292 9.95937 6.07369L8.55144 7.47508L7.09473 6.02506C5.80572 4.74196 5.61895 4.57321 5.4723 4.55923C4.91922 4.50648 4.54199 4.90011 4.67221 5.3941C4.71469 5.55527 4.94365 5.80655 6.14988 7.01585L7.57727 8.44688L6.14988 9.87791C4.94365 11.0872 4.71469 11.3385 4.67221 11.4997C4.60762 11.7447 4.67113 11.9831 4.84462 12.1476C4.96721 12.2638 5.24843 12.3734 5.35393 12.3462C5.37997 12.3395 5.4652 12.3201 5.54332 12.3032H5.54332Z" 
                                    fill="#A50104"
                                />
                            </svg>
                        </div>
                    </td>
                    <td className="checkbox-cell"></td>
            </tr>
    }
    */
    return <tr className="flex row center-row center-column size-12">
                <td className="checkbox-cell right-text flex center-column center-row">
                    <div className={"checkbox"+background} onClick={setComplete}>
                        <div className={checkmark} />
                    </div>
                </td>
                <td className={"flex row center-row center-column"+enable}>{typeField}</td>
                <td className={"flex row center-row center-column"+enable}>{valueField}</td>
                <td className="flex row center-row center-column">
                    <div className="flex center-column center-row margin-around">
                        {actionOne}
                    </div>
                    <div className="flex center-column center-row margin-around">
                        {actionTwo}
                    </div>
                </td>
                <td className="checkbox-cell"></td>
           </tr>
}
function MonthRevealed (props: any){
    const [revealState, setRevealState] = useState(false);
    useEffect( () => {
        setRevealState(props.reveal);
    }, [props.reveal])
    useEffect( () => {
        console.log('state changed!');
    }, [revealState])
    function shouldReload(e: any){
        props.shouldReload();
    }
    function hide(e: any){
        setRevealState(!revealState);
        props.hide();
    }
    let expenses = props.expenses.expenses.map( (expense: any, index: any, arr: any) => {
        return <Expense key={expense.id} data={expense} shouldReload={shouldReload} />
    })
    let focused = '';
    let redMargin = '';
    if (revealState) {
        focused = ' absolute focused';
        redMargin = ' margin-top-17';
    }
        return (
        <div className={"expense-container roboto scroll-hide"+focused} >
            <div className={"hover center-text margin-top-26 font-white scroll-hide"+redMargin} onClick={hide}>{props.expenses.month}</div>
            <div className="expense-list scroll">
                <table className={"margin-top-26"}>
                    <tbody>
                    <tr className="flex row center-row center-column color-orange size-14 roboto weight-normal">
                        <th className="checkbox-cell"></th>
                        <th>NAME</th>
                        <th>VALUE</th>
                        <th>ACTIONS</th>
                        <th className="checkbox-cell"></th>
                    </tr>
                    {expenses}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
class Month extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            month: '',
            isRevealed: false,
        }
        this.reveal = this.reveal.bind(this);
    }
    componentDidMount() {
        this.setState({month: this.props.expenses.month});
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.isRevealed != this.props.shouldReveal) {
            this.setState({isRevealed: this.props.shouldReveal});
        }
    }
    reveal(){
        let revealState = this.state.isRevealed;
        this.setState({isRevealed: !revealState}, () => {
            this.props.hide(this.state.month, this.state.isRevealed) 
        });
    }
    render() {
        return (
            <>
            <MonthRevealed expenses={this.props.expenses} reveal={this.state.isRevealed} hide={this.reveal} />
            </>
        )
    }
}
export class ExpenseList extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            expenses: [],
            displayed: { month: '', isRevealed: false },
            year: { index: 0, isRevealed: false },
        }
        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.shouldReload = this.shouldReload.bind(this);
    }
    componentDidMount(){
        fetch(apiRoot + 'expenses', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach( (data: any) => {
                data.isRevealed = false;
            })
            this.setState({ expenses: data, year: { index: (data.length - 1) } });
        })
        .catch((err) => {
            if (err) console.log(err);
        });
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.shouldReload) {
            this.componentDidMount();
            this.props.reloaded();
        }
    }
    reveal(e: any){
        let element = document.getElementById('Year-List');
        element!.addEventListener('transitionstart', () => {
            element!.classList.add('scroll-hide');
            element!.classList.remove('y-scroll-show');
            e.target.classList.add('bottom-border-straight');
        });
        element!.addEventListener('transitionend', () => {
            element!.classList.add('y-scroll-show');
            element!.classList.remove('scroll-hide');
            if (element!.style.getPropertyValue('height') == 'calc(0px)'){
                e.target.classList.remove('bottom-border-straight');
            }
        });
        console.log(element);
        let year = this.state.year;
        year.isRevealed = !this.state.year.isRevealed;
        this.setState({ year: year });
    }
    hide(month: any, isRevealed: any){
        console.log(month);
        console.log(isRevealed);
        let displayed = this.state.displayed;
        displayed.month = month;
        displayed.isRevealed = isRevealed;
        this.setState({displayed: displayed});
    }
    changeIndex(index: any){
        let newYear = this.state.year;
        newYear.index = index;
        newYear.isRevealed = false;
        let newDisplayed = this.state.displayed;
        newDisplayed.month = 'all';
        newDisplayed.isRevealed = false;
        this.setState({ displayed: newDisplayed, year: newYear });
    }
    shouldReload(e: any){
        fetch(apiRoot + 'expenses', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach( (data: any) => {
                data.isRevealed = false;
            })
            this.setState({ expenses: data });
        })
        .catch((err) => {
            if (err) console.log(err);
        });
    }
    render() {
        let index = this.state.year.index;
        let expenses: any = this.state.expenses[index];
        if (expenses === undefined) return (<div>Loading . . .</div>)
        let expensesList = expenses.months.map( (expense: any, index: any, arr: any) => {
            let shouldReveal = false;
            if (this.state.displayed.month == expense.month) shouldReveal = this.state.displayed.isRevealed;
            if (this.state.displayed.month == 'all') shouldReveal = false; 
            let row = 0;
            switch (index){
                case 0:
                case 1:
                case 2:
                    row = 0;
                    break;
                case 3:
                case 4:
                case 5:
                    row = 1;
                    break;
                case 6:
                case 7:
                case 8:
                    row = 2;
                    break;
                case 9:
                case 10:
                case 11:
                    row = 3;
                    break;
            }
            console.log(this.state.displayed.isRevealed);
            return <Month key={expense.month} 
                          expenses={expense} 
                          shouldReveal={shouldReveal} 
                          shouldReload={this.shouldReload} 
                          hide={this.hide} 
            />
        })
        let arrLength = 0;
        if (this.state.year.isRevealed){
            arrLength = this.state.expenses.length;
        }
        let list = this.state.expenses.map( (value: any, index: any, arr: any) => {
            return <div className="flex row center-column center-row year-container hover" key={value.year} onClick={this.changeIndex.bind(this, index)}>{value.year}</div>
        })
        let yearList = <div id="Year-List" className="absolute font-white flex column center-column roboto year-list to-front scroll-hide" style={{height: `calc(${arrLength}*40px)`}}>{list}</div>;
        let disable = '';
        if (this.props.disable) disable = ' disable';
        return (
            <div className={"flex column center-column margin-top-42"+disable}>
                <div className={"flex row center-column center-row font-white year-container roboto hover"} onClick={this.reveal} >{expenses.year}</div>
                {yearList}    
                <div> 
                    <div className="flex row font-white roboto expense-row relative" >{expensesList.slice(0, 3)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(3, 6)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(6, 9)}</div>
                    <div className="flex row font-white roboto expense-row" >{expensesList.slice(9, 12)}</div>
                </div>
            </div>
        );
    }
}