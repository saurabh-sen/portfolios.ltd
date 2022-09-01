import Image from 'next/image';
import { React, useState, useEffect } from 'react'
import styles from './BlankPortfolioComponent.module.css'
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as reference, uploadBytes } from "firebase/storage";

const BlankPortfolioComponent = ({ Uuid }) => {


  const [showModal, setShowModal] = useState(false);

  // dyanmic start

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [DomainName, setDomainName] = useState("");
  const [resume, setResume] = useState("");
  const [projects, setTotalProjects] = useState(0);
  const [clients, setTotalClients] = useState(0);
  const [experience, setTotalExperience] = useState(0);
  const [githubStars, setTotalGithubStars] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [LeetcodeUrl, setLeetcodeUrl] = useState("");
  const [uid, setUid] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [inputList, setInputList] = useState([{ skill: "", percentage: 0 }]);

  const [inputListProjects, setInputListProjects] = useState([{ projectName: "", githubLink: "" }]);

  const [imageFileName, setimageFileName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUid(Uuid);
    if (profileImage) {
      setimageFileName(profileImage.name);
    }
  }, [profileImage, Uuid]);  

  const storage = getStorage();

  const handleFormSubmit = () => {

    setLoading(true);
    const storageRef = reference(
      storage,
      `/${uid}/${DomainName}/${profileImage.name}`
    );
    uploadBytes(storageRef, profileImage).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    const db = getDatabase();

    set(ref(db, `/domain_details/${DomainName}/`), {
      UUid: uid,
    })

    const path = `/users/${uid}/${DomainName}`;
    set(ref(db, path), {
      Uid: uid,
      UName: name,
      UAbout: about,
      UDomainName: DomainName,
      UResume: resume,
      UProjects: projects,
      UClients: clients,
      UExperience: experience,
      UgithubStars: githubStars,
      UAddress: address,
      Uemail: email,
      USchool: school,
      UPhone: phone,
      UGithubUrl: githubUrl,
      ULeetcodeUrl: LeetcodeUrl,
      USkills: inputList,
      UProjectsLinks: inputListProjects
    }).then(() => {
      console.log("successfully db");
      setLoading(false);
      setShowModal(false);
      
    }).catch((error) => { console.log(error) });
  };

  // handle input change for skills
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button for skills
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button for skills
  const handleAddClick = () => {
    setInputList([...inputList, { skill: "", percentage: 0 }]);
  };

  // handle input change for projects
  const handleInputChangeProjects = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListProjects];
    list[index][name] = value;
    setInputListProjects(list);
  };

  // handle click event of the Remove button for Projects
  const handleRemoveClickProjects = index => {
    const list = [...inputListProjects];
    list.splice(index, 1);
    setInputListProjects(list);
  };

  // handle click event of the Add button for skills
  const handleAddClickProjects = () => {
    setInputListProjects([...inputListProjects, { projectName: "", githubLink: "" }]);
  };

  //  dynamic end

  return (
    <>
      <div className=" w-60 h-60 mx-16 my-8 flex justify-center flex-col items-center text-white cursor-pointer
       hover:bg-[#fff056ba] bg-[#6c82858f] rounded-2xl "
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5.9px)",
          WebkitBackdropFilter: "blur(5.9px)",
          border: "1px solid rgba(255, 255, 255, 0.11)",
        }}
        onClick={() => setShowModal(true)}
      >
        <svg className='w-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464,128H272L208,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128ZM359.5,296a16,16,0,0,1-16,16h-64v64a16,16,0,0,1-16,16h-16a16,16,0,0,1-16-16V312h-64a16,16,0,0,1-16-16V280a16,16,0,0,1,16-16h64V200a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64a16,16,0,0,1,16,16Z" /></svg>
        Create Awesome stuff
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-70"
            // onClick={() => setShowModal(false)}
            ></div>
            <div className="flex flex-col items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg">
                <h4 className=' m-auto font-bold '>Your Awesome portfolio</h4>
                <div className="modal-body relative p-4">

                  <form className='form'>
                    <input type="text" name="name"
                      placeholder="what's your name"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="nme" required autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="nme">
                    </label>
                    {/* image component */}
                    <div className=" flex mt-8 items-center ">
                      <div className=" mr-5 ">
                        <div className=" cursor-pointer relative ">
                          <span className={styles.ImageText}>{!imageFileName ? "Image here" : `${imageFileName}`}</span>
                          <input onChange={(e) => { setProfileImage(e.target.files[0]) }} style={{
                            width: "100%",
                            height: "100%"
                          }} type="file" id='imageFile' className={`${styles["input"]} ${styles["question"]} ${styles["inputImage"]} cursor-pointer `} required autoComplete="off" />
                        </div>
                      </div>
                      <div className=" w-max">
                        <Image src={"https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.webp"} className="" alt="example placeholder avatar" width="50px" height="50px" />
                      </div>
                    </div>
                    {/* image component end */}
                    <label className={styles.label} htlmfor="portfolioImage">
                    </label>
                    <textarea name="message" placeholder="About You" rows="1" className={`${styles["textarea"]} ${styles["question"]} mt-8`} id="msg" required autoComplete="off" cols="30"
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                    <label className={styles.label} htlmfor="msg">
                    </label>

                    <input type="text" name="domainName"
                      placeholder="Portfolio Domain Name"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="Dnme" required autoComplete="off"
                      onChange={(e) => setDomainName(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="Dnme">
                    </label>

                    <input type="url" name="resumeUrl"
                      placeholder="Resume's Url "
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="resumeUrl" required autoComplete="off"
                      onChange={(e) => setResume(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="resumeUrl">
                    </label>

                    <input type="number" name="totalProjects"
                      placeholder="Total Number of Projects"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="totalProjects" required autoComplete="off"
                      onChange={(e) => setTotalProjects(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="totalProjects">
                    </label>

                    <input type="number" name="totalClients"
                      placeholder="Number of clients "
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="totalClients" required autoComplete="off"
                      onChange={(e) => setTotalClients(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="totalClients">
                    </label>

                    <input type="number" name="totalExperience" style={{
                      width: "100%",
                    }}
                      placeholder="How much experience you have ?"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="totalExperience" required autoComplete="off"
                      onChange={(e) => setTotalExperience(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="totalExperience">
                    </label>

                    <input type="number" name="githubStars"
                      placeholder="Your Github Stars "
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="githubStars" required autoComplete="off"
                      onChange={(e) => setTotalGithubStars(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="githubStars">
                    </label>

                    {
                      inputList.map((x, i) => {
                        return (

                          <div className="box flex items-center" style={{
                            borderBottom: "1px solid red",
                          }} key={i}>
                            <input
                              type="text"
                              name="skill"
                              placeholder="skill !!"
                              value={x.skill}
                              onChange={e => handleInputChange(e, i)}
                              className={`${styles["input"]} ${styles["question"]} mt-8 mr-4`} required autoComplete="off"
                              style={{
                                borderRight: "1px solid red",
                              }}
                            />
                            <input
                              type="range"
                              name="percentage"
                              value={x.percentage}
                              onChange={e => handleInputChange(e, i)}
                              className={`${styles["input"]} ${styles["question"]} mt-8 mr-4`} required autoComplete="off"
                            />

                            <div className="btn-box">

                              {
                                inputList.length !== 1 && <button type="button"
                                  onClick={() => handleRemoveClick(i)}
                                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                  -
                                </button>
                              }
                              {
                                inputList.length - 1 === i && <button type="button"
                                  onClick={handleAddClick}
                                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                  +
                                </button>
                              }

                            </div>
                          </div>
                        );
                      })
                    }

                    {/* projects */}

                    {
                      inputListProjects.map((x, i) => {
                        return (

                          <div className="box flex items-center" style={{
                            borderBottom: "1px solid red",
                          }} key={i}>
                            <input
                              type="text"
                              name="projectName"
                              placeholder="Project Name"
                              value={x.projectName}
                              onChange={e => handleInputChangeProjects(e, i)}
                              className={`${styles["input"]} ${styles["question"]} mt-8 mr-4`} required autoComplete="off"
                              style={{
                                borderRight: "1px solid red",
                              }}
                            />
                            <input
                              type="url"
                              name="githubLink"
                              placeholder='https://github.com/projects'
                              value={x.githubLink}
                              onChange={e => handleInputChangeProjects(e, i)}
                              className={`${styles["input"]} ${styles["question"]} mt-8 mr-4`} required autoComplete="off"
                            />

                            <div className="btn-box">

                              {
                                inputListProjects.length !== 1 && <button type="button"
                                  onClick={() => handleRemoveClickProjects(i)}
                                  className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                  -
                                </button>
                              }
                              {
                                inputListProjects.length - 1 === i && <button type="button"
                                  onClick={handleAddClickProjects}
                                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                  +
                                </button>
                              }

                            </div>
                          </div>
                        );
                      })
                    }

                    <input type="address" name="Location"
                      placeholder="Your address !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="address" required autoComplete="off"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="address">
                    </label>

                    <input type="email" name="email"
                      placeholder="Your email !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="email" required autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="email">
                    </label>

                    <input type="text" name="school"
                      placeholder="Your recent education !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="school" required autoComplete="off"
                      onChange={(e) => setSchool(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="school">
                    </label>

                    <input type="tel" name="phone"
                      placeholder="Your mobile number !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="phone" required autoComplete="off"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="phone">
                    </label>

                    <input type="url" name="githubUrl"
                      placeholder="Github Url !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="githubUrl" required autoComplete="off"
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="githubUrl">
                    </label>

                    <input type="url" name="leetcodeUrl"
                      placeholder="LeetCode Url !"
                      className={`${styles["input"]} ${styles["question"]} mt-8`} id="leetcodeUrl" required autoComplete="off"
                      onChange={(e) => setLeetcodeUrl(e.target.value)}
                    />
                    <label className={styles.label} htlmfor="leetcodeUrl">
                    </label>

                  </form>

                </div>
                <div
                  className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                  <button type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 "
                    onClick={handleFormSubmit}
                  >
                    {loading ?
                      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-300" role="status">
                        <span className="visually-hidden">|</span>
                      </div>
                      : "Save changes"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default BlankPortfolioComponent