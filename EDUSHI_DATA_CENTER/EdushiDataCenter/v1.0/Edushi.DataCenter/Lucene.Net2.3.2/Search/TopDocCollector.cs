�}�� r �  �|*E��?���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���m��|�;)�_G��-·���������`����D��DBo���c ?'��ݪ�XC�yS��3<Foj�c�$`v���j���<Zn�x�'�HPl2oQ|i�E*�=-7bj�}xN�����pl��G?� ��R��^J��[E�
J��8����X·�=6���'���g�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIlD-���Itڌ'�v�q-����l�}�4R��MƎ<L'&��m������*�T�;n��jKN��*חk y���qW2,7�GL�^��%2�-&s$Z��")����tU�b�i6h*F�)�ʃ���4[ �W��Ch�{K��v�8ed%�Эә�K`���=Zyb^��z�ftWܩ)�Űa9(���Sͥ�5�[�M�w��N���óo��K�>����6�9@�}ȸ}����zh���DV-`��>�eG�t���T<��hxMd�5-�!��N� Z/%+�8�M`ƨT4Z��l�ʞ�F�hǣ����x��7�y1G�)�=�r��`�w!��� *��hr,��o�y�)@�=�BBHoڼ���R���sZ��qu?���Gϵ�Z<��G���+�����TI%��˗չ��F�1츛��J6�Vź/�K�CQ~�u����I�z�d+�����`K��d���5>]��W�$gd��84����U�:b�Ee"IP'"V�6fԹ](Q�l�)v�⌛�C78���G��Xh�� m=�Y9{&��k0 �!��5�x�5������ "`'FѸ35��T�XQ(�zy<�V�� 7���}�:�i2h��|R��b����<�2�@�S��x2����&#<�o?+�b�	�����u�0��y��[:ޒ%�V���,���t�CM��s$~.c��4180�U|��.�����tDr�u�) �����U���V��� �F���y��q�eё����R���æ5@Ͼ��J&�cg�"7}���N�Y����ۋ�拷oG�\��jO���z�8�q�P-Zd�e0vYu%�4�O�q�
)�Opd�,s��/�ߚjy���]z��-�M�*��n�nz,��C0��>�/��~����5��G^K�F�>Zq�B�4�`Q�n]%;��}
�?>] ��yc~6����D�����>�ä�:��|f듴"��*�OG핆%�T�,&��s�drH7�r��|�{*��sq��T��um-wLW��s�I�?�:7�lD(�V(42ou �$ʧ+G�ej_<'�s�"3�>���4��1eRa] ׼_��%ɮ�u��q����3��iD6+�t>�D�J�8�����J"� SD�U�����`�4ϐ��#�\/�]�ݰ�#��Z�R�R����@+d��"I�dY�pp�ݯ(C���Xf�S��SlX5�F��5`��Z��}
�� o/��;�![��P�������?��%�i9r${vZ$�Z���V	]cqV�7���b�_t����	J�AMS� �76k_�N�M�z-���T&:��j}{|�#`�I{�t!���:�v>������tȚ��2���A�n�7)�~�%յ���Qߍ�X/��QQ�^T�Q��C�����D�w�H=�|�"��r΂�̅�V��ѿ����3���(�iշ�F��C��&����!�	��l^��6�.7�RpBJWB���G(q>�����/j8�>��ЂA9���zW7_b���\�lHits()
		{
			return totalHits;
		}
		
		/// <summary>The top-scoring hits. </summary>
		public virtual TopDocs TopDocs()
		{
			ScoreDoc[] scoreDocs = new ScoreDoc[hq.Size()];
			for (int i = hq.Size() - 1; i >= 0; i--)
				// put docs in array
				scoreDocs[i] = (ScoreDoc) hq.Pop();
			
			float maxScore = (totalHits == 0) ? System.Single.NegativeInfinity : scoreDocs[0].score;
			
			return new TopDocs(totalHits, scoreDocs, maxScore);
		}
	}
}