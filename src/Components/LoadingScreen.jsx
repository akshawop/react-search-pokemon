import styles from "./LoadingScreen.module.css";
function LoadingScreen() {
    return (
        <div className={styles.loadingContainer}>
            <video autoPlay loop muted className={styles.loadingVideo}>
                <source src="pokeball_loading.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
export default LoadingScreen;
