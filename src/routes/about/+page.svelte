<script lang="ts">
	import TinyMceViewer from '$lib/tinyMce/TinyMceViewer.svelte';
	import { Paper } from '@svelteuidev/core';
	import FloatingButton from '$lib/ui/floatingButton/FloatingButton.svelte';
	import { goto } from '$app/navigation';
	import Vim from '$lib/ui/Vim.svelte';

	const onEnter = async (value: string) => {
		if (value == ':q' || value == ':q!') {
			await goto('/');
		} else if (value == ':/help') {
			const helpMessage =
				'Below commands are available\n' +
				`":q" or ":q!" : go back to main page\n` +
				`":/help" : show this help message`;
			alert(helpMessage);
		}
	};
</script>

<Paper>
	<TinyMceViewer>
		<h1 id="lutergs">LuterGS</h1>
		<p>
			현재 <strong>소프트웨어 개발자</strong> 로 일하고 있는, <strong>데이터 플랫폼</strong> 과
			<strong>백엔드 서비스</strong> 를 다루는 개발자입니다!
		</p>
		<h3 id="tech-specs">Tech specs</h3>
		<ul>
			<li>
				Language : <img
					src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&amp;logo=openjdk&amp;logoColor=white"
					alt="Java"
				/>
				<img
					src="https://img.shields.io/badge/kotlin-%230095D5.svg?style=for-the-badge&amp;logo=kotlin&amp;logoColor=white"
					alt="Kotlin"
				/>
				<img
					src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&amp;logo=python&amp;logoColor=ffdd54"
					alt="Python"
				/>
				<img
					src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&amp;logo=typescript&amp;logoColor=white"
					alt="TypeScript"
				/>
			</li>
			<li>
				Framework : <img
					src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&amp;logo=spring&amp;logoColor=white"
					alt="Spring"
				/>
				<img
					src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&amp;logo=fastapi"
					alt="FastAPI"
				/>
				<img
					src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&amp;logo=nestjs&amp;logoColor=white"
					alt="NestJS"
				/>
			</li>
			<li>
				Platform : <img
					src="https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&amp;logo=apachekafka"
					alt="Apache Kafka"
				/>
				<img
					src="https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&amp;logo=Apache%20Airflow&amp;logoColor=white"
					alt="Apache Airflow"
				/>
				<img
					src="https://user-images.githubusercontent.com/19836058/198917887-f8cdb54a-e174-4fb9-9033-a32c7c8cd8ed.svg"
					alt="Apache Beam"
				/>
			</li>
			<li>
				Infra : <img
					src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&amp;logo=google-cloud&amp;logoColor=white"
					alt="Google Cloud"
				/>
				<img
					src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&amp;logo=kubernetes&amp;logoColor=white"
					alt="Kubernetes"
				/>
				<img
					src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&amp;logo=docker&amp;logoColor=white"
					alt="Docker"
				/>
			</li>
			<li>
				etc
				<ul>
					<li>
						Observability : <img
							src="https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&amp;logo=grafana&amp;logoColor=white"
							alt="Grafana"
						/>
						-&gt; Grafana based
						<a href="https://www.dynatrace.com/news/blog/what-is-distributed-tracing/"
							>Distributed Tracing</a
						> stack (Grafana, Prometheus, Grafana Loki, Grafana Tempo, OpenTelemetry SDK)
					</li>
				</ul>
			</li>
		</ul>
		<h3 id="biography">Biography</h3>
		<ul>
			<li><code>(2017.03 ~ 2022.08)</code> 건국대학교 컴퓨터공학과 공학사 수료</li>
			<li><code>(2018.07 ~ 2020.02)</code> 육군 현역 (병역필)</li>
			<li><code>(2021.08 ~ 2022.12)</code> ENlighten 데이터 엔지니어로 근무</li>
			<li>
				<code>(2023.01 ~ current)</code> KT 환경플랫폼 (지니에어, AirMapKorea 등) 백엔드, 데이터 엔지니어로
				근무 중
			</li>
		</ul>
		<h3 id="working-experience">Working Experience</h3>
		<ul>
			<li>
				데이터 엔지니어 (<a href="https://enlighten.kr/">ENlighten</a>) : 2021.08 ~ 2022.12
				<ul>
					<li>
						<a href="https://www.electimes.com/news/articleView.html?idxno=306549"
							>엔라이튼, 스타트업 개발자 대상으로 &#39;Confluent Tech Talks&#39; 세미나 열어</a
						>
						(2022.07) - <code>ksqlDB</code> 사용법에 대해 발표
						<ul>
							<li>
								<a href="https://videos.confluent.io/watch/pZb5yw5EKguZmYGe4MRsGe">video link</a> - 35:22
								~ 43:23
							</li>
						</ul>
					</li>
					<li>
						<code>(2021.08 ~ 2021.12)</code> nestJS 기반 데이터 정제 서비스 리팩터링 및 유지보수
					</li>
					<li><code>(2022.01 ~ 2022.02)</code> Airflow 도입 및 Batch Job 작성, nestJS 리팩터링</li>
					<li>
						<code>(2022.03 ~ 2022.04)</code> Confluent Kafka PaaS 로 발전소 이상탐지 파이프라인 구축
					</li>
					<li>
						<code>(2022.05 ~ 2022.06)</code> custom CDC pipeline (GCP Datastream + Python) 구축 (새로운
						데이터 파이프라인 구성)
					</li>
					<li>
						<code>(2022.06 ~ 2022.07)</code> 이상탐지 파이프라인을 Kotlin Spring 으로 리팩터링
					</li>
					<li>
						<code>(2022.08 ~ 2022.12)</code> 데이터 소스 이원화 (MySQL, Bigquery) 및 데이터 마이그레이션
					</li>
				</ul>
			</li>
			<li>
				백엔드 개발자 (<a href="https://kt.com">KT</a>) : 2023.01 ~ now
				<ul>
					<li>
						<code>(2023.02 ~ 2023.09)</code> KT 환경플랫폼 데이터 파이프라인 v2 개발 리드 ( Kafka-based
						MSA with Java SpringBoot / Container-based develop env with k8s, containerd / Observability
						by Grafana stack / CI/CD with Jenkins/Nexus )
					</li>
					<li>
						<code>(2023.08 ~ 2023.12)</code> KT 환경플랫폼 IoT 기기의 이상탐지 및 제어기능 (위험제어,
						이상탐지) 개발 ( Spring WebFlux, ksqlDB )
					</li>
					<li>
						<code>(2024.01 ~ )</code> KT 스마트시티 2.0 의 Infra ( API Gateway 및 istio, k8s ), 데이터
						파이프라인 메인 설계 및 개발 담당
					</li>
				</ul>
			</li>
		</ul>
		<h3 id="awards-history">Awards History</h3>
		<ul>
			<li><code>(2020.09)</code> 2020 서울시 ICT 공모전 우수상</li>
			<li><code>(2020.09)</code> 2020 서울시 ICT 공모전 서울시특별상</li>
			<li><code>(2020.10)</code> ETRI 자율성장 인공지능 경진대회 시나리오 공모전 가작</li>
		</ul>
		<h3 id="license">License</h3>
		<ul>
			<li><code>(2022.05)</code> TOEIC 875</li>
		</ul>
		<h3 id="contact">Contact</h3>
		<ul>
			<li>
				email : <a href="mailto:lutergs@lutergs.dev">lutergs@lutergs.dev</a> ,
				<a href="mailto:koo04034@gmail.com">koo04034@gmail.com</a>
			</li>
		</ul>
		<h3 id="others">Others</h3>
	</TinyMceViewer>

	<FloatingButton backlink={''} />
	<Vim {onEnter} />
</Paper>
